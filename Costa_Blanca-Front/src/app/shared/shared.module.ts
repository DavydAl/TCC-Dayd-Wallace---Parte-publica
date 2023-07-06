import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ModalConfimacaoComponent } from './modais/modal-confimacao/modal-confimacao.component';
import { RetiradaProdutoComponent } from './modais/retirada-produto/retirada-produto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroAuxiliarComponent } from './modais/cadastro-auxiliar/cadastro-auxiliar.component';
import { MatSortModule } from '@angular/material/sort';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { ExportarExcelComponent } from './exportar-excel/exportar-excel.component';
import { EsqueceuSenhaComponent } from './modais/esqueceu-senha/esqueceu-senha.component';
import { ExportarPdfComponent } from './exportar-pdf/exportar-pdf.component';
import { DetalhesRetiradaComponent } from './modais/detalhes-retirada/detalhes-retirada.component';
import { AlteraQtdProdutoComponent } from './modais/altera-qtd-produto/altera-qtd-produto.component';
import { CancelarRetiradaComponent } from './modais/cancelar-retirada/cancelar-retirada.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

const materialModules = [
  MatCardModule,
  MatMenuModule,
  MatButtonModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatCheckboxModule,
  CommonModule,
  MatDialogModule,
  MatTableModule,
  MatTreeModule,
  MatTooltipModule,
  MatPaginatorModule,
  FormsModule,
  ReactiveFormsModule,
  MatSortModule,
  MatSortModule,
  NgxMaskDirective,
  NgxMaskPipe,

];

@NgModule({
  declarations: [
    ModalConfimacaoComponent,
    RetiradaProdutoComponent,
    CadastroAuxiliarComponent,
    ExportarExcelComponent,
    EsqueceuSenhaComponent,
    ExportarPdfComponent,
    DetalhesRetiradaComponent,
    AlteraQtdProdutoComponent,
    CancelarRetiradaComponent
  ],

  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ModalConfimacaoComponent,
    RetiradaProdutoComponent,
    ExportarExcelComponent,
    ExportarPdfComponent,
    ...materialModules

  ], providers: [provideEnvironmentNgxMask(maskConfig), provideNgxMask(), CurrencyPipe],
  bootstrap: []
})
export class SharedModule { }