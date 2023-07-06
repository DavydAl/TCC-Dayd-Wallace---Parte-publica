import { Component, Injector } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TipoCadastroEnum } from 'src/app/enum/tipo-cadastro.enum';
import { CadAuxiliaresModel } from 'src/app/model/cadastros-auxilares.model';
import { ClienteFornecedorModel } from 'src/app/model/cliente-fornecedor.model';
import { FiltroCadastroAuxiliarModel } from 'src/app/model/filtros/filtro-cadastro-auxiliar.model';
import { FiltroCFModel } from 'src/app/model/filtros/filtro-cf.model';
import { FiltroProdutoModel } from 'src/app/model/filtros/filtro-produto.model';
import { MenuManutencaoModel } from 'src/app/model/filtros/menu-manutencao.model';
import { ProdutoModel } from 'src/app/model/produto.model';
import { ClienteFornecedorService } from 'src/app/services/clicente-fornecedor.service';
import { ColecaoService } from 'src/app/services/colecao.service';
import { CorService } from 'src/app/services/cor.service';
import { EstoqueService } from 'src/app/services/estoque.service';
import { LinhaService } from 'src/app/services/linha.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProdutoService } from 'src/app/services/produtos.service';
import { SetorService } from 'src/app/services/setor.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TamanhoService } from 'src/app/services/tamanho.service';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})
export class ManutencaoComponent extends AppComponent {
  public lstProduto: ProdutoModel[] = [];
  public menuManutencao: MenuManutencaoModel = new MenuManutencaoModel();
  public lstColecao: CadAuxiliaresModel[] = [];
  public lstCor: CadAuxiliaresModel[] = [];
  public lstEstoque: CadAuxiliaresModel[] = [];
  public lstLinha: CadAuxiliaresModel[] = [];
  public lstMarca: CadAuxiliaresModel[] = [];
  public lstSetor: CadAuxiliaresModel[] = [];
  public lstTamanho: CadAuxiliaresModel[] = [];
  public lstFornecedor: ClienteFornecedorModel[] = [];
  public filtroCadastrosAuxiliares: FiltroCadastroAuxiliarModel = new FiltroCadastroAuxiliarModel();
  public filtro: FiltroProdutoModel = new FiltroProdutoModel();

  public colecaoService: ColecaoService;
  public corService: CorService;
  public estoqueService: EstoqueService;
  public linhaService: LinhaService;
  public marcaService: MarcaService;
  public setorService: SetorService;
  public tamanhoService: TamanhoService;
  public clienteFornecedorService: ClienteFornecedorService;
  public produtoService: ProdutoService;
  public snackbarService: SnackbarService;
  public filtrocf: FiltroCFModel = new FiltroCFModel();

  public cFService: ClienteFornecedorService;

  constructor(injector: Injector) {
    super(injector);
    this.colecaoService = injector.get(ColecaoService);
    this.tamanhoService = injector.get(TamanhoService);
    this.corService = injector.get(CorService);
    this.setorService = injector.get(SetorService);
    this.linhaService = injector.get(LinhaService);
    this.marcaService = injector.get(MarcaService);
    this.clienteFornecedorService = injector.get(ClienteFornecedorService);
    this.estoqueService = injector.get(EstoqueService);
    this.produtoService = injector.get(ProdutoService);
    this.snackbarService = injector.get(SnackbarService);
    this.cFService = injector.get(ClienteFornecedorService);
  }

  ngOnInit(): void {
    this.iniciar()

  }

  public iniciar() {

    this.loadingService.startLoad();
    this.filtroCadastrosAuxiliares.status = 'true';
    this.filtrocf.status = 'true';
    this.filtrocf.tipoCadastro = TipoCadastroEnum.Fornecedor.toString();
    this.buscarColecao();
    this.buscarLinha();
    this.buscarSetor();
    this.buscarMarca();
    this.buscarFornecedor();
    this.buscarTamanho();
    this.buscarCor();
    this.buscarFornecedor();
    this.menuManutencao.descricao = true;
    this.filtro.status = 'true';
    this.loadingService.stopLoad();
  }


  aplicarListasNoLocalStorage(): void {
    localStorage.setItem('lstColecao', JSON.stringify(this.lstColecao));
    localStorage.setItem('lstCor', JSON.stringify(this.lstCor));
    localStorage.setItem('lstEstoque', JSON.stringify(this.lstEstoque));
    localStorage.setItem('lstLinha', JSON.stringify(this.lstLinha));
    localStorage.setItem('lstMarca', JSON.stringify(this.lstMarca));
    localStorage.setItem('lstSetor', JSON.stringify(this.lstSetor));
    localStorage.setItem('lstTamanho', JSON.stringify(this.lstTamanho));
    localStorage.setItem('lstFornecedor', JSON.stringify(this.lstFornecedor));
    localStorage.setItem('menuManutencao', JSON.stringify(this.menuManutencao));
    localStorage.setItem('lstProduto', JSON.stringify(this.lstProduto));
  }

  public filtrar(): void {
    this.loadingService.startLoad();
    if (this.filtro.descricao && this.filtro.descricao.trim() !== '' && (this.lstColecao.length > 0 || this.lstCor.length > 0 || this.lstEstoque.length > 0 || this.lstLinha.length > 0 || this.lstMarca.length > 0 || this.lstSetor.length > 0 || this.lstTamanho.length > 0 || this.lstFornecedor.length > 0) && (this.lstColecao.length + this.lstCor.length + this.lstEstoque.length + this.lstLinha.length + this.lstMarca.length + this.lstSetor.length + this.lstTamanho.length + this.lstFornecedor.length) >= 3) {
      this.produtoService.listarProdutos(this.filtro).subscribe({
        next: (x: ProdutoModel[]) => {
          this.loadingService.startLoad();
          this.lstProduto = x;
          this.aplicarListasNoLocalStorage();
          this.router.navigate([`../produto/manutencao-massa`]);
          this.loadingService.stopLoad();
        },
        error: (error: any) => {
          this.router.navigate([`../produto/manutencao-massa`]);
          this.snackbarService.exibirMensagem('Erro ao efetuar busca.', 'error');
          this.loadingService.stopLoad();
        }
      });
    } else {
      this.loadingService.stopLoad();
      this.snackbarService.exibirMensagem('Selecione ao menos 3 filtros.\n Descrição é obrigatório', 'error');
    }
  }

  public buscarColecao() {
    this.colecaoService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      this.lstColecao = result
    })
  }

  public buscarCor() {
    this.corService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      this.lstCor = result
    })
  }

  public buscarLinha() {
    this.linhaService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      this.lstLinha = result
    })
  }

  public buscarMarca() {
    this.marcaService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      this.lstMarca = result
    })
  }

  public buscarSetor() {
    this.setorService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      this.lstSetor = result
    })
  }

  public buscarTamanho() {
    this.tamanhoService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      this.lstTamanho = result
    })
  }

  public buscarFornecedor() {
    this.cFService.listarCF(this.filtrocf).subscribe(result => {
      this.lstFornecedor = result
    })
  }

}

