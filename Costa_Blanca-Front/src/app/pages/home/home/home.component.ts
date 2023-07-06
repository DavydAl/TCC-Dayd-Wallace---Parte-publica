import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Chart } from 'chart.js/auto';
import { HomeService } from 'src/app/services/home.service';
import { FiltroHomeModel } from 'src/app/model/filtros/filtro-home.model';
import { HomeMovimentacaoModel, HomeSemanasModel, HomeRankingModel } from 'src/app/model/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AppComponent implements OnInit {
  public data: any = {};
  public filtro: FiltroHomeModel = new FiltroHomeModel();
  public movimentacaoModel: HomeMovimentacaoModel = new HomeMovimentacaoModel(this.data);
  public semanasModel: HomeSemanasModel = new HomeSemanasModel();
  public lstRankingModel: HomeRankingModel[] = [];
  public tickets: number = 0;
  public temMovimentacao = false;
  public exibirSemana = false;
  public dataAtual = new Date();

  public snackbarService: SnackbarService;
  public homeService: HomeService;

  dropdownVisible = false;
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  selectedMonth: number = this.dataAtual.getMonth();

  constructor(injector: Injector, public dialog: MatDialog) {
    super(injector);
    this.snackbarService = injector.get(SnackbarService);
    this.homeService = injector.get(HomeService);
  }

  ngOnInit() {
    this.filtro.ano = this.dataAtual.getFullYear();
    this.filtro.mes = this.dataAtual.getMonth() + 1;
    this.loadData();
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  selectMonth(monthIndex: number): void {
    this.selectedMonth = monthIndex;
    this.filtro.mes = monthIndex + 1;
    this.dropdownVisible = false;
    this.loadData();
  }

  public loadData() {
    this.movimentacaoModel = new HomeMovimentacaoModel({});
    this.lstRankingModel = [];
    this.semanasModel = new HomeSemanasModel();
    this.loadingService.startLoad();
    this.getRanking(this.filtro);
    this.getMovimentacao(this.filtro);
    this.getTickets(this.filtro);

    this.getSemanas(this.filtro);

    this.loadingService.stopLoad();
  }

  public getRanking(filtro: FiltroHomeModel) {
    this.lstRankingModel = [];
    this.homeService.getRanking(filtro).subscribe({
      next: ranking => {
        this.lstRankingModel = ranking;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public getTickets(filtro: FiltroHomeModel) {
    this.tickets = 0;
    this.homeService.getTickets(filtro).subscribe({
      next: ticket => {
        this.tickets = ticket;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public getMovimentacao(filtro: FiltroHomeModel) {
    this.temMovimentacao = false;
    this.movimentacaoModel = new HomeMovimentacaoModel({});
    this.homeService.getMovimentacao(filtro).subscribe({
      next: x => {
        let movimentacao: HomeMovimentacaoModel = new HomeMovimentacaoModel(x)
        this.movimentacaoModel = movimentacao;
        this.temMovimentacao = true;
      },
      error: error => {
        console.log(error);
        this.temMovimentacao = true;
      }
    });
  }

  public getSemanas(filtro: FiltroHomeModel) {
    this.exibirSemana = false;
    this.semanasModel = new HomeSemanasModel();
    this.homeService.getSemanas(filtro).subscribe({
      next: semanas => {
        this.semanasModel = semanas;
        this.exibirSemana = true;
      },
      error: error => {
        console.log(error);
        this.exibirSemana = true;
        this.loadingService.stopLoad();
      }
    });
  }

}