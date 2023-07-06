import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing-module';
import { HomeComponent } from './home/home.component';
import { GraficoSaidaProdutosComponent } from './components/grafico-saida-produtos/grafico-saida-produtos.component';
import { RankingProdutosComponent } from './components/ranking-produtos/ranking-produtos.component';
import { GraficoComparativoRetiradasComponent } from './components/grafico-comparativo-retiradas/grafico-comparativo-retiradas.component';
import { GraficoPizzaComponent } from './components/grafico-pizza/grafico-pizza.component';



@NgModule({
  declarations: [
    RankingProdutosComponent,
    GraficoSaidaProdutosComponent,
    HomeComponent,
    GraficoComparativoRetiradasComponent,
    GraficoPizzaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HomeRoutingModule
  ], exports: [
    HomeComponent
  ],
  providers: [],
  bootstrap: []

})
export class HomeModule { }
