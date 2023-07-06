import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { ProdutoModel, QtdProdutoModel } from '../model/produto.model';
import { FiltroProdutoModel } from '../model/filtros/filtro-produto.model';
import { Observable } from 'rxjs';
import { IProdutoInterface } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService {

  public httpClient: HttpClient;
  public router: Router;
  private lstProduto: ProdutoModel[] = [];

  constructor(injector: Injector) {
    super();
    this.httpClient = injector.get(HttpClient);
    this.router = injector.get(Router);

  }


  public salvarProdutos(produtos: ProdutoModel[]): Observable<any> {
    let allZeroOrUndefined = true;

    for (const produto of produtos) {
      if (produto.id !== 0 && produto.id !== undefined) {
        allZeroOrUndefined = false;
        break;
      }
    }

    if (allZeroOrUndefined) {
      return this.httpClient.post(`${this.urlApi}/add`, produtos, { responseType: 'text' });
    } else {
      return this.httpClient.put(`${this.urlApi}/updateProduct`, produtos, { responseType: 'text' });
    }
  }

  public listarProdutos(filtro: FiltroProdutoModel): Observable<IProdutoInterface[]> {
    let params = new HttpParams();

    if (filtro.id !== undefined && filtro.id !== '') {
      params = params.set('id', filtro.id.toString());
    }

    if (filtro.descricao !== undefined && filtro.descricao !== '') {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.referencia !== undefined && filtro.referencia !== '') {
      params = params.set('referencia', filtro.referencia);
    }

    if (filtro.codigoAuxiliar !== undefined && filtro.codigoAuxiliar !== '') {
      params = params.set('codigoAuxiliar', filtro.codigoAuxiliar);
    }

    if (filtro.setorId !== undefined && filtro.setorId !== '') {
      params = params.set('setorId', filtro.setorId.toString());
    }

    if (filtro.linhaId !== undefined && filtro.linhaId !== '') {
      params = params.set('linhaId', filtro.linhaId.toString());
    }

    if (filtro.marcaId !== undefined && filtro.marcaId !== '') {
      params = params.set('marcaId', filtro.marcaId.toString());
    }

    if (filtro.colecaoId !== undefined && filtro.colecaoId !== '') {
      params = params.set('colecaoId', filtro.colecaoId.toString());
    }

    if (filtro.fornecedorId !== undefined && filtro.fornecedorId !== '') {
      params = params.set('fornecedorId', filtro.fornecedorId.toString());
    }

    if (filtro.precoVenda !== undefined && filtro.precoVenda !== '') {
      params = params.set('precoVenda', filtro.precoVenda.toString());
    }

    if (filtro.precoCusto !== undefined && filtro.precoCusto !== '') {
      params = params.set('precoCusto', filtro.precoCusto.toString());
    }

    if (filtro.tamanhoId !== undefined && filtro.tamanhoId !== '') {
      params = params.set('tamanhoId', filtro.tamanhoId.toString());
    }

    if (filtro.corId !== undefined && filtro.corId !== '') {
      params = params.set('corId', filtro.corId.toString());
    }

    if (filtro.status === 'true' || filtro.status === 'false') {
      params = params.set('status', filtro.status);
    }


    if (filtro.isRetirada === 'true' || filtro.isRetirada === 'false') {
      params = params.set('isRetirada', filtro.isRetirada);
    }

    return this.httpClient.get<IProdutoInterface[]>(`${this.urlApi}/products`, { params });
  }

  public editarProduto(id: number): Observable<IProdutoInterface> {
    let params = new HttpParams();
    params = params.set('id', id.toString());
    return this.httpClient.get<IProdutoInterface>(`${this.urlApi}/product`, { params });
  }

  public alteraQtd(quantidade: QtdProdutoModel) {

    return this.httpClient.put(`${this.urlApi}/quantidade`, quantidade, { responseType: 'text' });
  }



}
