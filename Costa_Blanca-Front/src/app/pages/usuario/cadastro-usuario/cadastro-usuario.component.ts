import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Injector, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { FiltroFuncionarioModel } from 'src/app/model/filtros/filtro-funcionario.model';
import { FuncionarioModel } from 'src/app/model/funcionario.model';
import { UsuarioModel } from 'src/app/model/usuario.model';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { SalvarImagemService } from 'src/app/services/salvar-imagem.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent extends AppComponent implements OnInit {
  public lstFuncionario: FuncionarioModel[] = [];
  public funcionarioService: FuncionarioService;
  //public imagemSelecionada: string = '';
  public usuarioForm!: FormGroup;
  public usuario: UsuarioModel = new UsuarioModel();
  public snackbarService: SnackbarService;
  public imagemService: SalvarImagemService;

  constructor(private formBuilder: FormBuilder, injector: Injector, private route: ActivatedRoute, private render: Renderer2, private elementRef: ElementRef) {
    super(injector);
    this.snackbarService = injector.get(SnackbarService);
    this.formBuilder = injector.get(FormBuilder);
    this.funcionarioService = injector.get(FuncionarioService);
    this.imagemService = injector.get(SalvarImagemService)

    this.createForm(this.usuario);
  }

  ngOnInit(): void {
    this.loadingService.startLoad();
    this.buscarFuncionario();
    this.route.params.subscribe(params => {
      let id = parseInt(params['id']);
      if (id && id > 0) {
        this.usuarioService.editarUsuario(id).subscribe({
          next: (usuario: UsuarioModel) => {
            if (usuario) {
              this.createForm(usuario);
            }
          },
          error: (error: any) => {
            console.log(error);
            this.snackbarService.exibirMensagem(
              'Não foi possível acessar os dados do usuário.',
              'error'
            );
            this.navigate('usuario');
            return;
          },
        });
        this.loadingService.stopLoad();
      }
    });
    this.loadingService.stopLoad();
  }

  selecionarImagem() {
    const inputImagem = document.getElementById('inputImagem');
    inputImagem?.click();
  }

  onImagemSelecionada(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.usuarioForm.value.foto = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  removerImagem() {
    this.usuarioForm.value.foto = '';
  }

  public createForm(usuario: UsuarioModel) {
    this.usuarioForm = this.formBuilder.group({
      id: [usuario?.id],
      email: [usuario?.email, [Validators.required, Validators.email]],
      senha: ['', usuario.id === 0 ? [Validators.required, Validators.minLength(6)] : []],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
      status: [usuario?.status, Validators.required],
      funcionarioId: [usuario.funcionarioId, [Validators.required, Validators.pattern(/^(?!0+$)\d+$/)]],
      perfilGerencial: [usuario?.perfilGerencial],
      admin: [false],
      nome: [usuario?.nome, Validators.required],
      cpf: [usuario?.cpf, Validators.required],
      imagem: [''],
    });

  }

  // Função de validação personalizada para verificar se a senha e confirmPassword são iguais
  private passwordMatchValidator(control: AbstractControl) {
    const password = control.root.get('senha');
    const confirmPassword = control.value;

    if (password && confirmPassword && password.value !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }


  public buscarFuncionario() {
    const filtro: FiltroFuncionarioModel = new FiltroFuncionarioModel();
    filtro.status = 'true';
    lastValueFrom(this.funcionarioService.listarFuncionarios(filtro)).then(
      (res: FuncionarioModel[]) => {
        this.lstFuncionario = res;
      },
      (error: HttpErrorResponse) => {
        this.snackbarService.exibirMensagem(
          'Não foi possível buscar os funcionários.',
          'error'
        );
      }
    );
  }

  salvar() {
    if (this.usuarioForm.valid) {
      this.loadingService.startLoad();
      let usuario: UsuarioModel = new UsuarioModel();
      usuario = this.usuarioForm.value;
      usuario.funcionarioId = parseInt(this.usuarioForm.value.funcionarioId);

      this.usuarioService.salvarUsuario(usuario).subscribe({
        next: (result) => {

          this.loadingService.stopLoad();
          this.navigate('usuario');
          this.snackbarService.exibirMensagem('Usuário salvo!', 'success');
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.loadingService.stopLoad();
          this.snackbarService.exibirMensagem('Erro ao salvar Usuário.', 'error');
        }
      });
    } else {
      this.loadingService.stopLoad();
      this.usuarioForm.markAllAsTouched();

      // Remove a classe "is-invalid" dos campos que agora são válidos
      Object.keys(this.usuarioForm.controls).forEach(field => {
        const control = this.usuarioForm.get(field);
        if (control && control.valid) {
          const element = this.elementRef.nativeElement.querySelector(`[formControlName="${field}"]`);
          if (element) {
            this.render.removeClass(element, 'is-invalid');
          }
        }
      });

      if (this.usuarioForm.value.senha !== this.usuarioForm.value.confirmPassword) {
        this.snackbarService.exibirMensagem('Senha e confirmação de senha não coincidem.', 'error');
      }

      Object.keys(this.usuarioForm.controls).forEach(field => {
        const control = this.usuarioForm.get(field);
        if (control && control.invalid) {
          const element = this.elementRef.nativeElement.querySelector(`[formControlName="${field}"]`);
          if (element) {
            this.render.addClass(element, 'is-invalid');
          }
        }
      });
    }

  }

  dataURLtoFile(dataURL: string, filename: string): File {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  cancelar() {
    this.navigate('usuario');
  }
}
