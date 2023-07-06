import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListarProdutosComponent } from './listar-produtos/listar-produtos.component';
import { FiltrarProdutosComponent } from './filtrar-produtos/filtrar-produtos.component';
import { ProdutosRoutingModule } from './produto-routing-module';
import { ManutencaoComponent } from './manutencao/manutencao.component';
import { DadosComponent } from './manutencao/components/dados/dados.component';



@NgModule({
  declarations: [
    CadastroProdutosComponent,
    ListarProdutosComponent,
    FiltrarProdutosComponent,
    ManutencaoComponent,
    DadosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProdutosRoutingModule
  ], exports: [
    ListarProdutosComponent],
  providers: [],
  bootstrap: []

})
export class ProdutoModule { }
