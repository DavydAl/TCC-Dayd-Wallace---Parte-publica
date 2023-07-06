import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UsuarioModel } from 'src/app/model/usuario.model';
import { FiltrarUsuarioComponent } from '../filtrar-usuario/filtrar-usuario.component';
import { FiltroUsuarioModel } from 'src/app/model/filtros/filtro-usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfimacaoComponent } from '../../../shared/modais/modal-confimacao/modal-confimacao.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ModalConfirmacaoModel } from 'src/app/model/modal-confirmacao';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';
import { HttpErrorResponse } from '@angular/common/http';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FiltroFuncionarioModel } from 'src/app/model/filtros/filtro-funcionario.model';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { lastValueFrom } from 'rxjs';
import { FuncionarioModel } from 'src/app/model/funcionario.model';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
})
export class ListarUsuarioComponent extends AppComponent implements OnInit, AfterViewInit {
  @ViewChild(FiltrarUsuarioComponent) filtrarUsuarioComponent!: FiltrarUsuarioComponent;
  public lstUsuarios: UsuarioModel[] = [];
  public data: any[] = [];
  public nomeColunaExcel: string[] = ['Id Cadastro', 'Nome', 'Email', 'Funcionario', 'CPF', 'Status', 'PerfilGerencial'];
  public filtro: FiltroUsuarioModel = new FiltroUsuarioModel();
  public snackbarService: SnackbarService;
  public funcionarioService: FuncionarioService;

  // Tabela
  public displayedColumns: string[] = ['nome', 'email', 'cpf', 'status', 'acao'];
  public dataSource: MatTableDataSource<UsuarioModel> = new MatTableDataSource<UsuarioModel>(this.lstUsuarios);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  // Fim tabela

  constructor(injector: Injector, public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {
    super(injector);
    this.snackbarService = injector.get(SnackbarService);
    this.dataSource = new MatTableDataSource(this.lstUsuarios);
    this.funcionarioService = injector.get(FuncionarioService);
  }

  ngOnInit(): void {
    this.loadingService.startLoad();
    if (this.filtrarUsuarioComponent) {
      this.filtrarUsuarioComponent.filtroAlterado.subscribe((filtro: FiltroUsuarioModel) => {
        this.filtrar(filtro);
      });
    }
    this.loadingService.stopLoad();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(usuario: UsuarioModel): void {
    let dadosModal: ModalConfirmacaoModel = new ModalConfirmacaoModel();
    dadosModal.titulo = "Inativar Usuário";
    dadosModal.descricao = "Deseja realmente inativar o Usuário selecionado?";

    let dialogRef = this.dialog.open(ModalConfimacaoComponent, {
      data: dadosModal,
      width: '350px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadingService.startLoad();
      if (result) {
        usuario.status = false;
        this.usuarioService.salvarUsuario(usuario).subscribe({
          next: (result) => {
            this.loadingService.stopLoad();
            this.snackbarService.exibirMensagem('Usuário inativado com sucesso', 'success');
            this.reload();
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
            this.loadingService.stopLoad();
            this.snackbarService.exibirMensagem('Erro ao inativar Usuário.', 'error');
          }
        });
      }
      this.loadingService.stopLoad();
    });
  }

  filtrar(filtro: FiltroUsuarioModel) {
    this.loadingService.startLoad();
    this.usuarioService.listarUsuarios(filtro).subscribe({
      next: async (usuarios: UsuarioModel[]) => {
        this.lstUsuarios = usuarios;
        this.dataSource.data = this.lstUsuarios;
        const dados = await this.converterDadosParaExcel(usuarios);
        this.data = dados;
        this.loadingService.stopLoad();
      },
      error: error => {
        console.log(error);
        this.snackbarService.exibirMensagem('Erro ao efetuar busca.', 'error');
        this.loadingService.stopLoad();
      }
    });
    this.loadingService.stopLoad();
  }

  async converterDadosParaExcel(dados: UsuarioModel[]): Promise<any[]> {

    let lstFuncionario: FuncionarioModel[] = [];
    const filtro: FiltroFuncionarioModel = new FiltroFuncionarioModel();
    const funcionarios = await lastValueFrom(this.funcionarioService.listarFuncionarios(filtro));
    lstFuncionario = funcionarios;

    return dados.map(usuario => {
      let { senha, admin, status, perfilGerencial, cpf, foto, ...resto } = usuario;
      let statusConvertido = status ? 'Ativo' : 'Inativo';
      let perfilGerencialConvertido = perfilGerencial ? 'Sim' : 'Não';


      let formatarCPF = (valor: string) => {
        let cpfSemMascara = valor.replace(/\D/g, '');
        let cpfFormatado = cpfSemMascara.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        return cpfFormatado;
      };

      return {
        ...resto,
        funcionarioId: lstFuncionario.find(x => x.id == usuario.funcionarioId)?.nomeCompleto,
        cpf: formatarCPF(cpf.toString()),
        status: statusConvertido,
        perfilGerencial: perfilGerencialConvertido
      };
    });
  }
}
