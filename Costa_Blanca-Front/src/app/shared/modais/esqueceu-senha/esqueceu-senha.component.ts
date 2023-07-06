import { Component, Injector } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.css']
})
export class EsqueceuSenhaComponent extends AppComponent {

  public currentPassword: string = ''
  public newPassword: string = ''
  public repeatPassword: string = ''
  public snackbarService: SnackbarService;
  constructor(injector: Injector, public dialogRef: MatDialogRef<EsqueceuSenhaComponent>) {
    super(injector);
    this.snackbarService = injector.get(SnackbarService);
  }

  close(): void {
    this.dialogRef.close();
  }

  updatePassword(): void {
    if (this.usuarioLogado.senha == this.currentPassword) {
      if (this.newPassword === this.repeatPassword && this.newPassword !== '' && this.repeatPassword !== '') {
        this.dialogRef.close(this.newPassword);
      } else {
        this.snackbarService.exibirMensagem('Senhas não são iguais', 'error');
      }
    }
    else {
      this.snackbarService.exibirMensagem('Senhas atual Incorreta', 'error');
    }
  }
}
