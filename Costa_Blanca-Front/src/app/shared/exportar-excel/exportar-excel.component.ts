import { Component, Injector, Input } from '@angular/core';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'exportar-excel',
  template: `
    <button *ngIf="perfilGerencial" class="exportar-excel btn btn-success fixed-width" (click)="exportData()">Exportar Excel</button>
  `
})
export class ExportarExcelComponent {

  @Input() data: any[] = [];
  @Input() tituloExcel: string | undefined;
  @Input() tituloCampos: any[] = [];

  private snackbarService: SnackbarService;

  public perfilGerencial: boolean = false;

  constructor(private injector: Injector) {
    this.snackbarService = injector.get(SnackbarService);

    this.perfilGerencial = localStorage.getItem('usuarioG') !== null ? (localStorage.getItem('usuarioG') === 'true') : false;
  }

  exportData(): void {
    if (this.data.length <= 0) {
      this.snackbarService.exibirMensagem('Não foi possível efetuar a exportação!', 'error');
      return;
    }

    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet('Sheet 1');

    /* TITULO GERAL DO EXCEL */
    if (this.tituloExcel) {
      let titleRow = worksheet.addRow([this.tituloExcel]);
      let titleCell = titleRow.getCell(1);
      titleCell.font = { bold: true };
      titleCell.alignment = { horizontal: 'center' };
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0000' } };
      titleCell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
      worksheet.mergeCells(`A1:${this.getExcelAlpha(this.tituloCampos.length)}1`);
    }

    /* TITULO GERAL DAS COLUNAS */
    let columnTitleRow = worksheet.addRow(this.tituloCampos);
    columnTitleRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    columnTitleRow.alignment = { horizontal: 'center' };

    /* ESTILO TITULO DAS COLUNAS */
    columnTitleRow.eachCell((cell) => {
      if (cell.value) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '000000' } };
      }
    });

    /* INSERINDO DADOS NA TABELA */
    for (let item of this.data) {
      let rowData = Object.values(item);
      let row = worksheet.addRow(rowData);
      row.alignment = { horizontal: 'center' };
    }

    /* AJUSTES DA COLUNA DA TABELA */
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });

    /* ESTILIZANDO OS DADOS */
    let dataCellStyle = { alignment: { horizontal: 'center' } };

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (rowNumber === 1) {
          // Estilo do cabeçalho
          cell.font = { bold: true, color: { argb: '000000' } };
          cell.alignment = { horizontal: 'center' };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'C0C0C0' } }; // Fundo cinza
          cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
        } else {
          cell.alignment = { horizontal: 'center' };
          cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };

          // Adicionar borda à célula, mesmo que o valor seja null
          if (cell.value === null) {
            cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
          }
        }
      });
    });


    /* SALVANDO O ARQUIVO */
    workbook.xlsx.writeBuffer().then((buffer) => {
      let excelBlob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let fileName = this.tituloExcel ? `${this.tituloExcel}.xlsx` : 'dados.xlsx';

      saveAs(excelBlob, fileName);

      this.snackbarService.exibirMensagem('Dados exportados com sucesso!', 'success');
    });
  }

  private getExcelAlpha(index: number): string {
    let charCodeOffset = 'A'.charCodeAt(0);
    let alphabetLength = 26;

    let alpha = '';
    while (index > 0) {
      index--;
      alpha = String.fromCharCode((index % alphabetLength) + charCodeOffset) + alpha;
      index = Math.floor(index / alphabetLength);
    }
    return alpha;
  }
}
