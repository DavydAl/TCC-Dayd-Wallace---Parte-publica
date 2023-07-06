import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { CadastroAuxiliarEnum } from 'src/app/enum/cadastro-auxiliar-enum';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';
import { CadAuxiliaresModel } from 'src/app/model/cadastros-auxilares.model';
import { CadastroAuxiliarModel } from 'src/app/model/modal-cadastro-auxiliar.model';

@Component({
  selector: 'app-cadastro-auxiliar',
  templateUrl: './cadastro-auxiliar.component.html',
  styleUrls: ['./cadastro-auxiliar.component.css']
})
export class CadastroAuxiliarComponent extends AppComponent implements OnInit {

  constructor(injector: Injector, public dialogRef: MatDialogRef<CadastroAuxiliarModel>, @Inject(MAT_DIALOG_DATA) public data: CadastroAuxiliarModel) {
    super(injector)
  }

  ngOnInit(): void {
    this.tituloModal();
  }

  public confirmar() {
    let cadAuxiliar: CadAuxiliaresModel = {
      id: this.data.id,
      descricao: this.data.nome,
      status: this.data.status,

    }
    this.dialogRef.close(cadAuxiliar);
  }

  public tituloModal() {
    if (this.data.id == 0) {
      this.data.titulo = 'CADASTRAR ' + this.obterNomeEnum(this.data.tipoCadastro);
      this.data.status = true;
    } else {
      this.data.titulo = 'EDITAR ' + this.obterNomeEnum(this.data.tipoCadastro);
    }
  }


  public obterNomeEnum(id: number): string {
    switch (id) {
      case CadastroAuxiliarEnum.Cor:
        return 'COR';
      case CadastroAuxiliarEnum.Linha:
        return 'LINHA';
      case CadastroAuxiliarEnum.Colecao:
        return 'COLEÇÃO';
      case CadastroAuxiliarEnum.Marca:
        return 'MARCA';
      case CadastroAuxiliarEnum.Setor:
        return 'SETOR';
      case CadastroAuxiliarEnum.Tamanho:
        return 'TAMANHO';
      case CadastroAuxiliarEnum.Estoque:
        return 'ESTOQUE';
      case CadastroAuxiliarEnum.FormaRetirada:
        return 'FORMA DE RETIRADA';
      default:
        return '';
    }
  }
}
