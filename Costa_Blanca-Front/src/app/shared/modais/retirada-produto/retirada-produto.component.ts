import { AfterViewInit, Component, ElementRef, Injector, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Observer } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { CustomMatPaginatorIntl } from 'src/app/model/angular-material';
import { CadAuxiliaresModel } from 'src/app/model/cadastros-auxilares.model';
import { ClienteFornecedorModel } from 'src/app/model/cliente-fornecedor.model';
import { FiltroCadastroAuxiliarModel } from 'src/app/model/filtros/filtro-cadastro-auxiliar.model';
import { FiltroCFModel } from 'src/app/model/filtros/filtro-cf.model';
import { FiltroFuncionarioModel } from 'src/app/model/filtros/filtro-funcionario.model';
import { FiltroProdutoModel } from 'src/app/model/filtros/filtro-produto.model';
import { FiltroUsuarioModel } from 'src/app/model/filtros/filtro-usuario.model';
import { FuncionarioModel } from 'src/app/model/funcionario.model';
import { ItensRetiradaModel } from 'src/app/model/itens-retirada.model';
import { ProdutoModel } from 'src/app/model/produto.model';
import { RetirdaProdutoModel } from 'src/app/model/retirada.model';
import { UsuarioModel } from 'src/app/model/usuario.model';
import { ClienteFornecedorService } from 'src/app/services/clicente-fornecedor.service';
import { CorService } from 'src/app/services/cor.service';
import { FormaRetiradaService } from 'src/app/services/forma-retirada.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { ProdutoService } from 'src/app/services/produtos.service';
import { RetiradaProdutoService } from 'src/app/services/retirada-produto.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TamanhoService } from 'src/app/services/tamanho.service';

@Component({
  selector: 'app-retirada-produto',
  templateUrl: './retirada-produto.component.html',
  styleUrls: ['./retirada-produto.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]

})
export class RetiradaProdutoComponent extends AppComponent implements OnInit, AfterViewInit {
  public lstFuncionario: FuncionarioModel[] = [];
  public lstCliente: ClienteFornecedorModel[] = [];
  public lstProduto: ProdutoModel[] = [];
  public lstUsuario: UsuarioModel[] = [];
  public lstFormaRetirada: CadAuxiliaresModel[] = [];
  public retirada: RetirdaProdutoModel = new RetirdaProdutoModel();
  public displayedColumns: string[] = ['nome', 'qtd', 'precoUnico', 'desconto', 'total', 'acao'];
  public lstCor: CadAuxiliaresModel[] = [];
  public lstTamanho: CadAuxiliaresModel[] = [];
  public dataSource: ItensRetiradaModel[] = [];
  public filtro: FiltroProdutoModel = new FiltroProdutoModel()
  public dataCarregada = false;
  public searchText: string = '';
  public produtosFiltrados: ProdutoModel[] = [];
  public showSelect: boolean = false;
  public selectedProduct: ProdutoModel | undefined;
  public snackbarService: SnackbarService;
  public produtoService: ProdutoService;
  public retiradaService: RetiradaProdutoService;
  public funcionarioService: FuncionarioService;
  public cfService: ClienteFornecedorService;
  public formaRetiradaService: FormaRetiradaService;
  public corService: CorService;
  public tamanhoService: TamanhoService;

  public currentDate: Date = new Date();

  constructor(injector: Injector, public dialogRef: MatDialogRef<RetiradaProdutoComponent>, private elementRef: ElementRef) {
    super(injector);
    this.snackbarService = injector.get(SnackbarService);
    this.produtoService = injector.get(ProdutoService);
    this.retiradaService = injector.get(RetiradaProdutoService);
    this.funcionarioService = injector.get(FuncionarioService);
    this.cfService = injector.get(ClienteFornecedorService);
    this.formaRetiradaService = injector.get(FormaRetiradaService);
    this.corService = injector.get(CorService);
    this.tamanhoService = injector.get(TamanhoService);
  }

  async ngOnInit(): Promise<void> {
    await this.iniciar();
  }

  ngAfterViewInit(): void {
    const today = new Date();
    const formattedDate = this.formatDate(today.toString());

    this.retirada.dataRetirada = formattedDate !== undefined ? formattedDate : '';
    this.retirada.usuarioId = this.usuarioLogado.id;
    this.retirada.funcionarioId = this.usuarioLogado.funcionarioId;

  }

  updateDate(): void {
    const inputDate: Date = new Date(this.retirada.dataRetirada);

    if (inputDate > this.currentDate) {
      const today = new Date();
      const formattedDate = this.formatDate(today.toString());
      this.retirada.dataRetirada = formattedDate !== undefined ? formattedDate : '';
    }
  }

  public iniciar() {
    this.loadingService.startLoad();
    this.buscarCor();
    this.buscarTamanho();
    this.buscarFornecedor();
    this.buscarFuncionario();
    this.buscarUsuario();
    this.buscarFormaRetirada();
    this.loadingService.stopLoad();
    this.dataCarregada = true;
  }

  public buscarProduto(): void {
    if ((this.filtro.descricao === '' || this.filtro.descricao === undefined) && (this.filtro.corId === '' || this.filtro.corId === undefined) && (this.filtro.tamanhoId === '' || this.filtro.tamanhoId === undefined))
      return;

    this.loadingService.startLoad();

    this.filtro.status = 'true';
    this.filtro.isRetirada = 'true';

    this.produtoService.listarProdutos(this.filtro).subscribe({
      next: (x: ProdutoModel[]) => {
        this.produtosFiltrados = x;
        this.loadingService.stopLoad();
        this.reload();
      },
      error: (error: any) => {
        this.loadingService.stopLoad();
        this.snackbarService.exibirMensagem('Erro ao efetuar busca.', 'error');
      },
      complete: () => {

      }
    });

    this.loadingService.stopLoad();
  }


  public updateTotal(product: ItensRetiradaModel): void {
    product.valorTotalProdutos = this.calculateTotalPrice(product);
  }

  public calculateTotalPrice(product: ItensRetiradaModel): number {
    const totalPrice = product.valorUnitario * product.quantidade - product.desconto;
    return totalPrice;
  }

  public adicionarProduto(produto: ProdutoModel): void {
    const itemExistenteIndex = this.retirada.items.findIndex(item => item.produtoId === produto.id);
    if (itemExistenteIndex !== -1) {
      const itemExistente = this.retirada.items[itemExistenteIndex];
      itemExistente.quantidade++;
      itemExistente.valorTotalProdutos = this.calculateTotalPrice(itemExistente);
    } else {
      const novoItem: ItensRetiradaModel = new ItensRetiradaModel();
      novoItem.produtoId = produto.id;
      novoItem.produtoNome = produto.descricao + " " + this.getCorName(produto.corId) + " " + this.getTamanhoName(produto.tamanhoId);
      novoItem.valorUnitario = produto.precoVenda;
      novoItem.quantidade = 1;
      novoItem.valorTotalProdutos = this.calculateTotalPrice(novoItem);
      this.retirada.items.push(novoItem);
    }

    this.dataSource = this.retirada.items.slice();
    this.searchText = '';
  }

  public removerProduto(id: number): void {
    const index = this.retirada.items.findIndex(item => item.produtoId === id);
    if (index !== -1) {
      const itemRemovido = this.retirada.items[index];
      this.retirada.items.splice(index, 1);
      this.dataSource = [...this.retirada.items]; // Atualize a propriedade dataSource com uma nova cópia da lista
      this.updateTotal(itemRemovido); // Chame a função updateTotal com o item removido
    }
  }


  public calcularTotalItem(item: ItensRetiradaModel): number {
    const valorTotalProdutos = item.valorUnitario * item.quantidade;
    const desconto = item.desconto;
    const total = valorTotalProdutos - desconto;
    return total;
  }

  calculateTotalValue(items: ItensRetiradaModel[] | undefined): number {
    if (!items) {
      return 0;
    }

    let total = 0;
    for (const item of items) {
      const quantidade = item.quantidade || 0;
      const valorUnitario = item.valorUnitario || 0;
      const desconto = item.desconto || 0;

      const subtotal = (quantidade * valorUnitario) - desconto;
      total += subtotal;
    }

    this.retirada.valorTotal = total;

    return total;
  }


  public calcularValorTotal(): number {
    let valorTotal = 0;
    for (const item of this.retirada.items) {
      valorTotal += this.calcularTotalItem(item);
    }

    return valorTotal;
  }

  public registrarRetirada(): void {
    debugger
    if (this.retirada.items.length <= 0) {
      this.snackbarService.exibirMensagem('Necessário adicionar produtos para retirada!', 'error');
      return;
    }

    if (this.retirada.formaRetiradaId <= 0 || this.retirada.formaRetiradaId == undefined) {
      this.snackbarService.exibirMensagem('Necessário selecionar uma forma de retirada!', 'error');
      return;
    }

    if (this.retirada.clienteId <= 0 || this.retirada.clienteId == undefined) {
      this.snackbarService.exibirMensagem('Necessário selecionar um cliente!', 'error');
      return;
    }

    this.loadingService.startLoad();
    let retiradaProduto = {
      id: this.retirada.ticket,
      ticket: this.retirada.id,
      dataRetirada: this.parseDate(this.retirada.dataRetirada),
      dataInicio: this.retirada.dataInicio,
      dataFim: this.retirada.dataFim,
      clienteId: this.retirada.clienteId,
      funcionarioId: this.retirada.funcionarioId,
      usuarioId: this.retirada.usuarioId,
      dataCancelamento: this.retirada.dataCancelamento,
      formaRetiradaId: this.retirada.formaRetiradaId,
      cancelado: this.retirada.cancelado,
      valorTotal: this.retirada.valorTotal,
      obs: this.retirada.obs,
      items: this.retirada.items
    } as unknown as RetirdaProdutoModel;
    debugger
    this.retiradaService.salvarRegistro(retiradaProduto).subscribe({
      next: (result) => {

        this.loadingService.stopLoad();
        this.snackbarService.exibirMensagem('Registro de retirada efetuado com sucesso!.', 'success');
        this.dialogRef.close();

      },
      error: (error: any) => {

        this.loadingService.stopLoad();
        this.snackbarService.exibirMensagem('Erro ao efetuar registro de retirada.', 'error');
      }
    });


    this.loadingService.stopLoad();
  }


  public buscarFornecedor() {
    this.lstCliente = [];
    let filtroCf: FiltroCFModel = new FiltroCFModel();
    filtroCf.status = 'true'
    this.cfService.listarCF(filtroCf).subscribe(result => {
      if (result.length > 0)
        this.lstCliente = result;
    })
  }

  public buscarFuncionario() {
    this.lstFuncionario = [];
    let filtro: FiltroFuncionarioModel = new FiltroFuncionarioModel();
    filtro.status = 'true';
    this.funcionarioService.listarFuncionarios(filtro).subscribe(result => {
      if (result.length > 0)
        this.lstFuncionario = result;
    })
  }

  public buscarUsuario() {
    this.lstUsuario = [];
    let filtro: FiltroUsuarioModel = new FiltroUsuarioModel();
    filtro.status = 'true';
    this.usuarioService.listarUsuarios(filtro).subscribe(result => {
      if (result.length > 0)
        this.lstUsuario = result;
    })
  }

  public buscarFormaRetirada() {
    this.lstFormaRetirada = [];
    let filtro: FiltroCadastroAuxiliarModel = new FiltroCadastroAuxiliarModel()
    this.formaRetiradaService.listar(filtro).subscribe({
      next: (x: CadAuxiliaresModel[]) => {
        if (x.length > 0) {
          this.lstFormaRetirada = x;
        }
      }
    });

    this.loadingService.stopLoad();
  }

  public buscarCor() {
    this.lstCor = [];
    let filtro: FiltroCadastroAuxiliarModel = new FiltroCadastroAuxiliarModel();
    filtro.status = 'true';

    this.corService.listar(filtro).subscribe(result => {
      if (result.length > 0)
        this.lstCor = result;
    })
  }

  public buscarTamanho() {
    this.lstTamanho = [];
    let filtro: FiltroCadastroAuxiliarModel = new FiltroCadastroAuxiliarModel();
    filtro.status = 'true';
    this.tamanhoService.listar(filtro).subscribe(result => {
      if (result.length > 0)
        this.lstTamanho = result;
    })
  }

  getCorName(corId: number): string {
    const cor = this.lstCor.find(c => c.id === corId);
    return cor ? cor.descricao : '';
  }

  getTamanhoName(tamanhoId: number): string {
    const tamanho = this.lstTamanho.find(t => t.id === tamanhoId);
    return tamanho ? tamanho.descricao : '';
  }

  getNomeCad(id: number, lst: CadAuxiliaresModel[]): string {
    const nome = lst.find(t => t.id === id);
    return nome ? nome.descricao : '';
  }

}
