import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observer } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { TipoCadastroEnum } from 'src/app/enum/tipo-cadastro.enum';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';
import { CadAuxiliaresModel } from 'src/app/model/cadastros-auxilares.model';
import { ClienteFornecedorModel } from 'src/app/model/cliente-fornecedor.model';
import { FiltroCadastroAuxiliarModel } from 'src/app/model/filtros/filtro-cadastro-auxiliar.model';
import { FiltroCFModel } from 'src/app/model/filtros/filtro-cf.model';
import { FiltroProdutoModel } from 'src/app/model/filtros/filtro-produto.model';
import { ModalConfirmacaoModel } from 'src/app/model/modal-confirmacao';
import { ProdutoModel, QtdProdutoModel } from 'src/app/model/produto.model';
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
import { AlteraQtdProdutoComponent } from 'src/app/shared/modais/altera-qtd-produto/altera-qtd-produto.component';
import { ModalConfimacaoComponent } from 'src/app/shared/modais/modal-confimacao/modal-confimacao.component';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
})
export class ListarProdutosComponent extends AppComponent implements OnInit {
  public lstProduto: ProdutoModel[] = [];
  public lstFornecedor: ClienteFornecedorModel[] = [];
  public lstColecao: CadAuxiliaresModel[] = [];
  public lstCor: CadAuxiliaresModel[] = [];
  public lstEstoque: CadAuxiliaresModel[] = [];
  public lstLinha: CadAuxiliaresModel[] = [];
  public lstMarca: CadAuxiliaresModel[] = [];
  public lstSetor: CadAuxiliaresModel[] = [];
  public lstTamanho: CadAuxiliaresModel[] = [];
  public filtroCadastrosAuxiliares: FiltroCadastroAuxiliarModel = new FiltroCadastroAuxiliarModel();
  public filtrocf: FiltroCFModel = new FiltroCFModel();

  public nomeColunaExcel: string[] = [];
  public data: any = [];

  //services
  public colecaoService: ColecaoService;
  public corService: CorService;
  public estoqueService: EstoqueService;
  public linhaService: LinhaService;
  public marcaService: MarcaService;
  public setorService: SetorService;
  public tamanhoService: TamanhoService;
  public cFService: ClienteFornecedorService;
  public snackbarService: SnackbarService;
  public produtoService: ProdutoService;

  // Tabela

  public displayedColumns: string[] = ['codigo', 'nome', 'referencia', 'codigoAuxiliar', 'fornecedores', 'preco', 'quantidade', 'acoes'];
  public dataSource: MatTableDataSource<ProdutoModel> = new MatTableDataSource<ProdutoModel>(this.lstProduto);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  // Fim tabela


  constructor(injector: Injector, public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {
    super(injector);

    this.snackbarService = injector.get(SnackbarService);
    this.produtoService = injector.get(ProdutoService);
    this.colecaoService = injector.get(ColecaoService);
    this.tamanhoService = injector.get(TamanhoService);
    this.corService = injector.get(CorService);
    this.setorService = injector.get(SetorService);
    this.linhaService = injector.get(LinhaService);
    this.marcaService = injector.get(MarcaService);
    this.cFService = injector.get(ClienteFornecedorService);
    this.estoqueService = injector.get(EstoqueService)



    this.dataSource = new MatTableDataSource(this.lstProduto);
  }

  ngOnInit(): void {
    this.iniciar();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public iniciar() {
    this.filtrocf.tipoCadastro = TipoCadastroEnum.Fornecedor.toString();
    this.buscarColecao();
    this.buscarLinha();
    this.buscarSetor();
    this.buscarMarca();
    this.buscarFornecedor();
    this.buscarTamanho();
    this.buscarCor();
    this.buscarFornecedor();
  }

  public filtrar(filtro: FiltroProdutoModel) {
    this.loadingService.startLoad();

    const observer: Observer<ProdutoModel[]> = {
      next: (x: ProdutoModel[]) => {
        if (x.length > 0) {
          this.lstProduto = x;
          this.data = this.converterDadosParaExcel(x);
          this.dataSource.data = this.lstProduto;
          this.loadingService.stopLoad();
        }
      },
      error: (error: any) => {
        this.loadingService.stopLoad();
        this.snackbarService.exibirMensagem('Erro ao efetuar busca.', 'error');
      },
      complete: () => {
        // Função opcional que é chamada quando a observação é concluída
      }
    };

    this.produtoService.listarProdutos(filtro).subscribe(observer);

    this.loadingService.stopLoad();
  }

  openDialog(produto: ProdutoModel): void {
    let dadosModal: ModalConfirmacaoModel = new ModalConfirmacaoModel();
    dadosModal.titulo = "Inativar Produto";
    dadosModal.descricao = "Deseja realmente inativar o produto selecionado?" + '\n' + "O saldo em estoque do produto inativado será zerado!";

    let dialogRef = this.dialog.open(ModalConfimacaoComponent, {
      data: dadosModal,
      width: '350px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadingService.startLoad();
      if (result) {
        let lista: ProdutoModel[] = [];

        produto.status = false;

        lista.push(produto)

        this.produtoService.salvarProdutos(lista).subscribe({
          next: (result) => {
            this.loadingService.stopLoad();
            this.snackbarService.exibirMensagem('Produto inativado com sucesso', 'success');
            this.reload();
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
            this.loadingService.stopLoad();
            this.snackbarService.exibirMensagem('Erro ao inativar Produto.', 'error');
          }
        });
      }
      this.loadingService.stopLoad();
    });
  }

  alterarQuantidade(produto: ProdutoModel): void {

    let quantidade: QtdProdutoModel = new QtdProdutoModel();

    quantidade = {
      id: produto.id,
      quantidade: produto.quantidade
    }

    let dialogRef = this.dialog.open(AlteraQtdProdutoComponent, {
      data: quantidade,
      width: '350px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadingService.startLoad();
      if (result) {
        this.produtoService.alteraQtd(result).subscribe({
          next: (x) => {
            this.loadingService.stopLoad();
            this.snackbarService.exibirMensagem('Quantidade alterada efetuada com sucesso', 'success');
            this.reload();
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
            this.loadingService.stopLoad();
            this.snackbarService.exibirMensagem('Erro ao alterar quantidade.', 'error');
          }
        });
      }
      this.loadingService.stopLoad();
    });
  }

  public converterDadosParaExcel(dados: ProdutoModel[]): any[] {

    this.nomeColunaExcel = ['Código', 'Código Auxiliar', 'Nome', 'Cor', 'Tamanho', 'Referência', 'Setor', 'Linha', 'Marca', 'Coleção', 'Fornecedor', 'Preço Venda', 'Preço Custo', 'Data de Cadastro', 'Garantia', 'Qtd Estoque', 'Peso', 'Altura', 'Largura', 'Comprimento', 'Status', 'Observação'];

    return dados.map((produto: ProdutoModel) => ({
      id: produto.id,
      codigoAuxiliar: produto.codigoAuxiliar,
      descricao: produto.descricao,
      corId: this.lstCor.find(cor => cor.id === produto.corId)?.descricao || '',
      tamanhoId: this.lstTamanho.find(tamanho => tamanho.id === produto.tamanhoId)?.descricao || '',
      referencia: produto.referencia,
      setorId: this.lstSetor.find(setor => setor.id === produto.setorId)?.descricao || '',
      linhaId: this.lstLinha.find(linha => linha.id === produto.linhaId)?.descricao || '',
      marcaId: this.lstMarca.find(marca => marca.id === produto.marcaId)?.descricao || '',
      colecaoId: this.lstColecao.find(colecao => colecao.id === produto.colecaoId)?.descricao || '',
      fornecedorId: this.lstFornecedor.find(cf => cf.id === produto.fornecedorId)?.nomeRazao || '',
      precoVenda: produto.precoVenda !== undefined ? this.formatCurrency(produto.precoVenda) : '',
      precoCusto: produto.precoCusto !== undefined ? this.formatCurrency(produto.precoCusto) : '',
      dataCadastro: this.formatDateExcel(produto.dataCadastro?.toString()),
      tempoGarantia: produto.tempoGarantia + ' dias',
      quantidade: produto.quantidade,
      peso: produto.peso,
      altura: produto.altura,
      largura: produto.largura,
      comprimento: produto.comprimento,
      status: produto.status ? 'Ativo' : 'Inativo',
      observacao: produto.observacao,
    }));
  }

  getNomeCad(id: number, lst: CadAuxiliaresModel[]): string {
    const nome = lst.find(t => t.id === id);
    return nome ? nome.descricao : '';
  }

  getNomeFornecedor(id: number): string {
    const nome = this.lstFornecedor.find(t => t.id === id);
    return nome ? nome.nomeRazao : '';
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
