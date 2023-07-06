import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { HomeMovimentacaoModel } from 'src/app/model/home.model';

@Component({
  selector: 'app-grafico-pizza',
  templateUrl: './grafico-pizza.component.html',
  styleUrls: ['./grafico-pizza.component.css']
})
export class GraficoPizzaComponent implements OnInit, AfterViewInit {
  @ViewChild('chart', { static: true }) chartElement!: ElementRef<HTMLCanvasElement>;
  @Input() movimentacaoModel!: HomeMovimentacaoModel;

  public itensRetiradosEstoque: { qtd: string; prct: number; } = { qtd: '', prct: 0 };
  public itensCancelados: { qtd: string; prct: number; } = { qtd: '', prct: 0 };
  public totalMovimentado: { qtd: string; prct: number; } = { qtd: '', prct: 0 };



  ngOnInit() {

  }


  ngAfterViewInit() {
    const totalMovimentadoEntries = Object.entries(this.movimentacaoModel.totalMovimentado);
    for (const [chave, valor] of totalMovimentadoEntries) {
      this.totalMovimentado.qtd = chave;
      this.totalMovimentado.prct = valor;
    }

    // Extrair os valores de this.movimentacaoModel.itensCancelados
    const itensCanceladosEntries = Object.entries(this.movimentacaoModel.itensCancelados);
    for (const [chave, valor] of itensCanceladosEntries) {
      this.itensCancelados.qtd = chave;
      this.itensCancelados.prct = valor;
    }

    // Extrair os valores de this.movimentacaoModel.itensRetiradosDoEstoque
    const itensRetiradosDoEstoqueEntries = Object.entries(this.movimentacaoModel.itensRetiradosDoEstoque);
    for (const [chave, valor] of itensRetiradosDoEstoqueEntries) {
      this.itensRetiradosEstoque.qtd = chave;
      this.itensRetiradosEstoque.prct = valor;
    }


    const chartData = [
      this.itensRetiradosEstoque.qtd,
      this.itensCancelados.qtd
    ];
    const chartLabels = [
      'Itens Retirados do Estoque',
      'Itens Cancelados'
    ];
    const chartColors = ['#007bff', '#dc3545'];

    const chart = new Chart(this.chartElement.nativeElement, {
      type: 'pie',
      data: {
        datasets: [{
          data: chartData,
          backgroundColor: chartColors
        }],
        labels: chartLabels
      }
    });


  }


}
