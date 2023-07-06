import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProdutosComponent } from './listar-produtos/listar-produtos.component';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { ManutencaoComponent } from './manutencao/manutencao.component';
import { DadosComponent } from './manutencao/components/dados/dados.component';
const routes: Routes = [
  { path: '', component: ListarProdutosComponent },
  { path: 'edit/:id', component: CadastroProdutosComponent },
  { path: 'novo', component: CadastroProdutosComponent },
  { path: 'manutencao', component: ManutencaoComponent },
  { path: 'manutencao-massa', component: DadosComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProdutosRoutingModule { }
