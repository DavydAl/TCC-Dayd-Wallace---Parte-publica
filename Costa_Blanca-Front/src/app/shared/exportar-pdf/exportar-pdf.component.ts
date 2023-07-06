import { Component, Injector, Input } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AppComponent } from 'src/app/app.component';
import { ItensRetiradaModel } from 'src/app/model/itens-retirada.model';
import { RetirdaProdutoModel } from 'src/app/model/retirada.model';

@Component({
  selector: 'exportar-pdf',
  template: `
    <div class="icon-container">
      <a matTooltip="Salvar Ticket" (click)="downloadPdf('ticket.pdf')"><i class="bi bi-file-earmark-arrow-down-fill"></i></a>
      <a matTooltip="Imprimir Ticket" (click)="printPdf()"> <i class="bi bi-printer-fill"></i> </a>
    </div>`,
  styles: [` .icon-container {display: flex; justify-content: flex-end;} .icon-container a {color: #555555; margin-right: 3px; font-size: 20px;}`]

})
export class ExportarPdfComponent extends AppComponent {
  @Input() retiradaProduto: RetirdaProdutoModel = new RetirdaProdutoModel();
  @Input() formaRetirada: string = '';
  @Input() funcionario: string = '';
  @Input() cliente: string = '';

  constructor(injector: Injector) {
    super(injector);
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }



  downloadPdf(filename?: string) {
    this.loadingService.startLoad();

    const content = [
      { text: 'Recebimento', style: 'header' },
      {
        text: `Ticket: ${this.retiradaProduto.id}`,
        style: 'subheader'
      },
      this.retiradaProduto.cancelado ? {
        text: `Cancelado: ${this.formatarDataExcel(this.retiradaProduto.dataCancelamento?.toString() ?? '')}`,
        style: 'cancelado'
      } : null,
      { text: `Data da retirada: ${this.formatarDataExcel(this.retiradaProduto.dataRetirada.toString())}` },
      { text: `Cliente: ${this.cliente}` },
      { text: `Funcionário: ${this.funcionario}` },
      { text: `Tipo de retirada: ${this.formaRetirada}` },
      this.retiradaProduto.cancelado ? { text: `Motivo Cancelamento: ${this.retiradaProduto.obs}`, style: 'motivoCancelamento' } : null,
      { text: 'Itens de Retirada', style: 'header' },
      this.createItemsTable(this.retiradaProduto.items),
      { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 517, y2: 10 }] },
      { text: `Valor Total: ${this.transform(this.retiradaProduto.valorTotal)}`, alignment: 'right', margin: [0, 10] }
    ].filter(item => item !== null);


    const documentDefinition: any = {
      content,
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        tableHeader: { bold: true, fontSize: 12, fillColor: '#EEEEEE' },
        cancelado: { fontSize: 12, color: 'red' },
        motivoCancelamento: { fontSize: 12, color: 'red', margin: [0, 5, 0, 10] }
      }
    };

    pdfMake.createPdf(documentDefinition).download(filename || `Ticket: ${this.retiradaProduto.id}`);
    this.loadingService.stopLoad();
  }



  printPdf() {
    this.loadingService.startLoad();

    const content = [
      { text: 'Recebimento', style: 'header' },
      {
        text: `Ticket: ${this.retiradaProduto.id}`,
        style: 'subheader'
      },
      this.retiradaProduto.cancelado ? {
        text: `Cancelado: ${this.formatarDataExcel(this.retiradaProduto.dataCancelamento?.toString() ?? '')}`,
        style: 'cancelado'
      } : null,
      { text: `Data da retirada: ${this.formatarDataExcel(this.retiradaProduto.dataRetirada.toString())}` },
      { text: `Cliente: ${this.cliente}` },
      { text: `Funcionário: ${this.funcionario}` },
      { text: `Tipo de retirada: ${this.formaRetirada}` },
      this.retiradaProduto.cancelado ? { text: `Motivo Cancelamento: ${this.retiradaProduto.obs}`, style: 'motivoCancelamento' } : null,
      { text: 'Itens de Retirada', style: 'header' },
      this.createItemsTable(this.retiradaProduto.items),
      { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 517, y2: 10 }] },
      { text: `Valor Total: ${this.transform(this.retiradaProduto.valorTotal)}`, alignment: 'right', margin: [0, 10] }
    ].filter(item => item !== null);


    const documentDefinition: any = {
      content,
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        tableHeader: { bold: true, fontSize: 12, fillColor: '#EEEEEE' },
        cancelado: { fontSize: 12, color: 'red' },
        motivoCancelamento: { fontSize: 12, color: 'red', margin: [0, 5, 0, 10] }
      }
    };

    pdfMake.createPdf(documentDefinition).print();

    this.loadingService.stopLoad();
  }


  createItemsTable(items: ItensRetiradaModel[]) {
    const tableRows = [];
    tableRows.push([
      { text: 'Produto', style: 'tableHeader', alignment: 'center' },
      { text: 'Quantidade', style: 'tableHeader', alignment: 'center' },
      { text: 'Valor Unitário', style: 'tableHeader', alignment: 'center' },
      { text: 'Desconto', style: 'tableHeader', alignment: 'center' },
      { text: 'Total', style: 'tableHeader', alignment: 'center' }
    ]);

    for (const item of items) {
      const produtoNome = item.produtoNome || ''; // Verifica se o valor é nulo e atribui uma string vazia em vez de nulo
      const quantidade = item.quantidade?.toString() || ''; // Verifica se o valor é nulo e atribui uma string vazia em vez de nulo
      const valorUnitario = this.transform(item.valorUnitario || 0); // Verifica se o valor é nulo e atribui 0 em vez de nulo
      const desconto = this.transform(item.desconto || 0); // Verifica se o valor é nulo e atribui 0 em vez de nulo
      const valorTotalProdutos = this.transform(item.valorTotalProdutos || 0); // Verifica se o valor é nulo e atribui 0 em vez de nulo

      tableRows.push([
        { text: produtoNome, alignment: 'center' },
        { text: quantidade, alignment: 'center' },
        { text: valorUnitario, alignment: 'center' },
        { text: desconto, alignment: 'center' },
        { text: valorTotalProdutos, alignment: 'center' }
      ]);
    }

    return {
      table: {
        widths: ['*', '*', '*', '*', '*'],
        body: tableRows
      },
      layout: 'lightHorizontalLines',
      style: 'table'
    };
  }




  public transform(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }


}
