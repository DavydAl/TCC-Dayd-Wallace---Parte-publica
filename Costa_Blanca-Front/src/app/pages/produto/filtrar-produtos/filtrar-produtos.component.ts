import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CadAuxiliaresModel } from 'src/app/model/cadastros-auxilares.model';
import { ClienteFornecedorModel } from 'src/app/model/cliente-fornecedor.model';;
import { FiltroProdutoModel } from 'src/app/model/filtros/filtro-produto.model';


@Component({
  selector: 'filtrar-produtos',
  templateUrl: './filtrar-produtos.component.html',
  styleUrls: ['./filtrar-produtos.component.css']
})
export class FiltrarProdutosComponent extends AppComponent implements OnInit {
  public filtro: FiltroProdutoModel = new FiltroProdutoModel();
  @Output() public filtroAlterado: EventEmitter<FiltroProdutoModel> = new EventEmitter<FiltroProdutoModel>();

  @Input() lstColecao: CadAuxiliaresModel[] = [];
  @Input() lstCor: CadAuxiliaresModel[] = [];
  @Input() lstEstoque: CadAuxiliaresModel[] = [];
  @Input() lstLinha: CadAuxiliaresModel[] = [];
  @Input() lstMarca: CadAuxiliaresModel[] = [];
  @Input() lstSetor: CadAuxiliaresModel[] = [];
  @Input() lstTamanho: CadAuxiliaresModel[] = [];
  @Input() lstFornecedor: ClienteFornecedorModel[] = [];


  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.filtro.status = 'true';
    this.filtrar();
  }

  public filtrar() {
    this.filtroAlterado.emit(this.filtro);
  }
}
