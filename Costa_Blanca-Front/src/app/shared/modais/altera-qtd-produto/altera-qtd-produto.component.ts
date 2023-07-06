import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';
import { QtdProdutoModel } from 'src/app/model/produto.model';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-altera-qtd-produto',
  templateUrl: './altera-qtd-produto.component.html',
  styleUrls: ['./altera-qtd-produto.component.css']
})
export class AlteraQtdProdutoComponent extends AppComponent implements OnInit {
  public snackbarService: SnackbarService;
  public quantidade: number;
  public novaQuantidade: number;

  constructor(injector: Injector, public dialogRef: MatDialogRef<AlteraQtdProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QtdProdutoModel) {
    super(injector);

    this.snackbarService = injector.get(SnackbarService);
    this.quantidade = data.quantidade;
    this.novaQuantidade = 0;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  update(): void {
    if (this.novaQuantidade) {
      const quantidade = {
        id: this.data.id,
        quantidade: this.novaQuantidade,
      };
      this.dialogRef.close(quantidade);
    } else {
      return this.snackbarService.exibirMensagem('Preencha um valor diferente de 0', 'error');
    }
  }
}
