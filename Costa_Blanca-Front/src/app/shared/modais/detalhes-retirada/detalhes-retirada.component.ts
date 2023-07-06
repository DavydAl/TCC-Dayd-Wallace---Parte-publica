import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';
import { CadAuxiliaresModel } from 'src/app/model/cadastros-auxilares.model';
import { ClienteFornecedorModel } from 'src/app/model/cliente-fornecedor.model';
import { FuncionarioModel } from 'src/app/model/funcionario.model';
import { ItensRetiradaModel } from 'src/app/model/itens-retirada.model';
import { RetirdaProdutoModel } from 'src/app/model/retirada.model';

interface DetalhesRetiradaData {
  retirada?: RetirdaProdutoModel;
  lstCliente?: ClienteFornecedorModel[],
  lstFuncionario?: FuncionarioModel[],
  lstTipoRetirada?: CadAuxiliaresModel[],
}

@Component({
  selector: 'app-detalhes-retirada',
  templateUrl: './detalhes-retirada.component.html',
  styleUrls: ['./detalhes-retirada.component.css']
})
export class DetalhesRetiradaComponent implements OnInit {
  data: DetalhesRetiradaData = {};

  public cliente: string = '';
  public tipoRetirada: string = '';
  public funcionario: string = '';

  constructor(
    public dialogRef: MatDialogRef<DetalhesRetiradaComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DetalhesRetiradaData
  ) { }

  ngOnInit(): void {
    this.data = this.dialogData;
    this.cliente = this.data.retirada?.clienteId ? this.data.lstCliente?.[this.data.retirada?.clienteId]?.nomeRazao ?? '' : '';
    this.tipoRetirada = this.data.retirada?.formaRetiradaId ? this.data.lstTipoRetirada?.[this.data.retirada?.formaRetiradaId]?.descricao ?? '' : '';
    this.funcionario = this.data.retirada?.id ? this.data.lstFuncionario?.[this.data.retirada?.id]?.nomeCompleto ?? '' : '';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  calculateTotalValue(items: ItensRetiradaModel[] | undefined): number {
    if (!items) {
      return 0;
    }

    let total = 0;
    for (const item of items) {
      total += item.valorTotalProdutos;
    }
    return total;
  }
}
