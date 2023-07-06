import { Component, ElementRef, Injector, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AppComponent } from 'src/app/app.component';
import { FiltroHomeModel } from 'src/app/model/filtros/filtro-home.model';
import { HomeSemanasModel } from 'src/app/model/home.model';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'grafico-saida-produtos',
  template: '<canvas id="chartCanvas" width="500" height="300"></canvas>',
  styleUrls: ['./grafico-saida-produtos.component.css']
})
export class GraficoSaidaProdutosComponent extends AppComponent implements OnInit {

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
    Chart.register(...registerables);

    const canvas = document.getElementById('chartCanvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (context) {
      const chart = new Chart(context, {
        type: 'bar',
        data: {
          labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
          datasets: [
            {
              data: [
                this.semanasModel.mesAtual?.semana1,
                this.semanasModel.mesAtual?.semana2,
                this.semanasModel.mesAtual?.semana3,
                this.semanasModel.mesAtual?.semana4
              ],
              backgroundColor: ['red', 'green', 'blue', 'black'],
              borderColor: ['red', 'green', 'blue', 'black'],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false // Esconde o rótulo
            },
            title: {
              display: true,
              text: 'Ticket Retirada Mês Atual',
              color: 'black'
            }
          }
        }
      });
    }
  }

}
