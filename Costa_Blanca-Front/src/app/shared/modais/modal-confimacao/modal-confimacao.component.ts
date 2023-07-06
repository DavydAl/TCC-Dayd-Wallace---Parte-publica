import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';
import { ModalConfirmacaoModel } from 'src/app/model/modal-confirmacao';

@Component({
  selector: 'app-modal-confimacao',
  templateUrl: './modal-confimacao.component.html',
  styleUrls: ['./modal-confimacao.component.css']
})
export class ModalConfimacaoComponent extends AppComponent implements OnInit {
  public modal: ModalConfirmacaoModel = new ModalConfirmacaoModel();

  constructor(injector: Injector, public dialogRef: MatDialogRef<ModalConfimacaoComponent>, @Inject(MAT_DIALOG_DATA) public data: ModalConfirmacaoModel) {
    super(injector)
  }

  ngOnInit(): void {
    this.modal = this.data;
  }

  public confirmar(value: boolean) {
    this.modal.confirmacao = value;
    this.dialogRef.close(this.modal.confirmacao);
  }


}
