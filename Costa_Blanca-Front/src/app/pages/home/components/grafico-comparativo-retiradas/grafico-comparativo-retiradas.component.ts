import { Component, OnInit, ViewChild, ElementRef, Input, Injector } from '@angular/core';
import { Chart } from 'chart.js';
import { HomeSemanasModel } from 'src/app/model/home.model';
import 'chart.js/auto';
import { FiltroHomeModel } from 'src/app/model/filtros/filtro-home.model';
import { HomeService } from 'src/app/services/home.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'grafico-comparativo-retiradas',
  template: `<canvas #chartCanvas></canvas>`
})
export class GraficoComparativoRetiradasComponent extends AppComponent implements OnInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() semanasModel: HomeSemanasModel = new HomeSemanasModel();
  //filtro: FiltroHomeModel = new FiltroHomeModel();

  constructor(injector: Injector, private homeService: HomeService) {
    super(injector);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.initChart();
    }, 100);
  }

  initChart(): void {

    const data = {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      datasets: [
        {
          label: 'Retiradas - Mês Atual',
          data: [
            this.semanasModel.mesAtual.semana1,
            this.semanasModel.mesAtual.semana2,
            this.semanasModel.mesAtual.semana3,
            this.semanasModel.mesAtual.semana4
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Cor de preenchimento da linha
          borderColor: 'rgba(54, 162, 235, 1)', // Cor da linha
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Retiradas - Mês Passado',
          data: [
            this.semanasModel.mesAnterior.semana1,
            this.semanasModel.mesAnterior.semana2,
            this.semanasModel.mesAnterior.semana3,
            this.semanasModel.mesAnterior.semana4
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // Cor de preenchimento da linha
          borderColor: 'rgba(255, 99, 132, 1)', // Cor da linha
          borderWidth: 1,
          fill: false,
        },
      ],
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const canvas = this.chartCanvas.nativeElement;
    const context = canvas.getContext('2d');

    // Defina as dimensões desejadas para o elemento <canvas>
    const canvasWidth = 450;
    const canvasHeight = 300;

    // Ajuste o tamanho do elemento <canvas>
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (context) {
      new Chart(context, {
        type: 'line',
        data: data,
        options: options,
      });
    }
  }



}
