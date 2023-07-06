import { Component, EventEmitter, HostListener, Injector, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { ConfirmacaoModal } from 'src/app/model/confirmacao-modal.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material/dialog';
import { EsqueceuSenhaComponent } from '../modais/esqueceu-senha/esqueceu-senha.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent extends AppComponent {
  @Output() ModalConfirmacaoComponent = new EventEmitter<any>();
  @ViewChild('confirmacao')


  confirmacao: ConfirmacaoModal = {} as ConfirmacaoModal;
  public isExpanded: boolean = false;
  public snack: SnackbarService;

  private screenWidth$ = new BehaviorSubject<number>
    (window.innerWidth);

  constructor(injector: Injector, public dialog: MatDialog) {
    super(injector);
    this.snack = injector.get(SnackbarService);
  }

  public ngOnInit() {
    this.isExpanded = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any; }; }) {
    this.screenWidth$.next(event.target.innerWidth);
  }

  public deslogar() {

    this.confirmacao = {
      titulo: 'Deseja sair do sistema?',
      texto: 'Toda alteração que não foi salva será perdida! Deseja Continuar?'
    } as ConfirmacaoModal;

    this.ModalConfirmacaoComponent.emit(this.confirmacao);

    this.usuarioService.deslogar();
  }

  public editarSenha(): void {
    const dialogRef = this.dialog.open(EsqueceuSenhaComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadingService.startLoad();
      this.usuarioService.redefinirSenha(this.usuarioLogado.id, result).subscribe({
        next: () => {
          this.snack.exibirMensagem('Senha alterada com sucesso.', 'success');
        },
        error: (error: any) => {
          this.loadingService.stopLoad();
          this.snack.exibirMensagem('Erro ao alterar senha.', 'error');
        },
        complete: () => {

        }
      });


      this.loadingService.stopLoad();
    });
  }

  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }


  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
