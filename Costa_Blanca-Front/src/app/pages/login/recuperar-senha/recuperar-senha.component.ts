import { Component, Injector, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UsuarioModel } from 'src/app/model/usuario.model';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent extends AppComponent implements OnInit {
  public usuario = {} as UsuarioModel;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  public snack: SnackbarService;

  constructor(injector: Injector) {
    super(injector);
    this.snack = injector.get(SnackbarService);
  }

  ngOnInit(): void {

  }

  salvar() {
    this.loadingService.startLoad();
    this.usuarioService.recuperarSenha(this.usuario.email, this.usuario.cpf).subscribe({
      next: result => {
        this.loadingService.stopLoad();
        this.snack.exibirMensagem('E-mail enviado com sucesso!', 'success');
        this.navigate('/login'); // Navegação para a página de login
      },
      error: error => {
        this.loadingService.stopLoad();
        this.snack.exibirMensagem('E-mail enviado com sucesso!', 'success');
        this.navigate('/login'); // Navegação para a página de login
      },
      complete: () => {
        // Lógica para lidar com a conclusão da operação, se necessário
      }
    });
    this.loadingService.stopLoad();
  }

}
