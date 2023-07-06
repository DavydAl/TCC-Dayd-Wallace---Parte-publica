import { Component, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';
import { CancelarRetirdaProdutoModel } from 'src/app/model/retirada.model';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-cancelar-retirada',
  templateUrl: './cancelar-retirada.component.html',
  styleUrls: ['./cancelar-retirada.component.css']
})
export class CancelarRetiradaComponent extends AppComponent {
  public snackbarService: SnackbarService;

  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<CancelarRetiradaComponent>,
    @Inject(MAT_DIALOG_DATA) public ticket: CancelarRetirdaProdutoModel
  ) {
    super(injector);
    this.snackbarService = injector.get(SnackbarService);

  }

  close(): void {
    this.dialogRef.close();
  }

  salvar(): void {


    if (!this.ticket?.obs) {
      this.snackbarService.exibirMensagem('Preencha o motivo', 'error');
      return;
    }

    if (!this.ticket?.id) {
      this.snackbarService.exibirMensagem('ID do ticket inválido', 'error');
      return;
    }

    this.dialogRef.close(this.ticket);
  }
}
