import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RankingProdutosComponent } from './components/ranking-produtos/ranking-produtos.component';
import { GraficoSaidaProdutosComponent } from './components/grafico-saida-produtos/grafico-saida-produtos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
