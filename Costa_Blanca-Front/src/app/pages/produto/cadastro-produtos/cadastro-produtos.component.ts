import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Injector, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { FiltroCadastroAuxiliarModel } from 'src/app/model/filtros/filtro-cadastro-auxiliar.model';
import { ProdutoModel } from 'src/app/model/produto.model';
import { ColecaoService } from 'src/app/services/colecao.service';
import { CorService } from 'src/app/services/cor.service';
import { EstoqueService } from 'src/app/services/estoque.service';
import { LinhaService } from 'src/app/services/linha.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ClienteFornecedorService } from 'src/app/services/clicente-fornecedor.service';
import { ProdutoService } from 'src/app/services/produtos.service';
import { SetorService } from 'src/app/services/setor.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TamanhoService } from 'src/app/services/tamanho.service';
import { CadAuxiliaresModel } from 'src/app/model/cadastros-auxilares.model';
import { FuncionarioModel } from 'src/app/model/funcionario.model';
import { ClienteFornecedorModel } from 'src/app/model/cliente-fornecedor.model';
import { FiltroCFModel } from 'src/app/model/filtros/filtro-cf.model';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent extends AppComponent implements OnInit {
  public produtoModel: ProdutoModel = new ProdutoModel();
  public imagemSelecionada: string = '';
  public lstColecao: CadAuxiliaresModel[] = [];
  public lstCor: CadAuxiliaresModel[] = [];
  public lstEstoque: CadAuxiliaresModel[] = [];
  public lstLinha: CadAuxiliaresModel[] = [];
  public lstMarca: CadAuxiliaresModel[] = [];
  public lstSetor: CadAuxiliaresModel[] = [];
  public lstTamanho: CadAuxiliaresModel[] = [];
  public lstFornecedor: ClienteFornecedorModel[] = [];
  public filtroCadastrosAuxiliares: FiltroCadastroAuxiliarModel = new FiltroCadastroAuxiliarModel();

  public selectedCorIds: number[] = [];
  public selectedTamanhoIds: number[] = [];


  //services
  public colecaoService: ColecaoService;
  public corService: CorService;
  public estoqueService: EstoqueService;
  public linhaService: LinhaService;
  public marcaService: MarcaService;
  public setorService: SetorService;
  public tamanhoService: TamanhoService;
  public cFService: ClienteFornecedorService;
  public produtoForm!: FormGroup;
  public edit = false;

  public snackbarService: SnackbarService;
  public produtoService: ProdutoService;


  constructor(private formBuilder: FormBuilder, injector: Injector, private route: ActivatedRoute, private render: Renderer2, private elementRef: ElementRef, private currencyPipe: CurrencyPipe) {
    super(injector);
    this.snackbarService = injector.get(SnackbarService);
    this.formBuilder = injector.get(FormBuilder);
    this.produtoService = injector.get(ProdutoService);
    this.colecaoService = injector.get(ColecaoService);
    this.tamanhoService = injector.get(TamanhoService);
    this.corService = injector.get(CorService);
    this.setorService = injector.get(SetorService);
    this.linhaService = injector.get(LinhaService);
    this.marcaService = injector.get(MarcaService);
    this.cFService = injector.get(ClienteFornecedorService);
    this.estoqueService = injector.get(EstoqueService);

    this.createForm(this.produtoModel);


  }

  async ngOnInit(): Promise<void> {

    this.iniciar();
    this.loadingService.startLoad();
    this.route.params.subscribe(params => {
      let id = parseInt(params['id']);
      if (id && id > 0) {
        this.produtoService.editarProduto(id).subscribe({
          next: (produto: ProdutoModel) => {
            if (produto) {
              this.edit = true
              this.createForm(produto);
              this.loadingService.stopLoad();
            }
          },
          error: (error: any) => {
            console.log(error);
            this.loadingService.stopLoad();
            this.snackbarService.exibirMensagem(
              'Não foi possível acessar os dados do funcionário.',
              'error'
            );
            this.navigate('produto');
            return;
          },
        });

      }
    });
    this.loadingService.stopLoad();
  }

  public iniciar() {
    this.filtroCadastrosAuxiliares.status = 'true';
    this.buscarColecao();
    this.buscarLinha();
    this.buscarSetor();
    this.buscarMarca();
    this.buscarFornecedor();
    this.buscarTamanho();
    this.buscarCor();
  }

  public createForm(produtoModel: ProdutoModel): void {
    this.produtoForm = new FormGroup({
      id: new FormControl({ value: produtoModel.id, disabled: true }, [Validators.required]),
      descricao: new FormControl(produtoModel.descricao, Validators.required),
      referencia: new FormControl(produtoModel.referencia, Validators.required),
      codigoAuxiliar: new FormControl(produtoModel.codigoAuxiliar, Validators.required),
      setorId: new FormControl(produtoModel.setorId, [Validators.required, Validators.pattern(/^(?!0+$)\d+$/)]),
      linhaId: new FormControl(produtoModel.linhaId, [Validators.required, Validators.pattern(/^(?!0+$)\d+$/)]),
      marcaId: new FormControl(produtoModel.marcaId, [Validators.required, Validators.pattern(/^(?!0+$)\d+$/)]),
      colecaoId: new FormControl(produtoModel.colecaoId, [Validators.required, Validators.pattern(/^(?!0+$)\d+$/)]),
      fornecedorId: new FormControl(produtoModel.fornecedorId, [Validators.required, Validators.pattern(/^(?!0+$)\d+$/)]),
      precoVenda: new FormControl(produtoModel.precoVenda, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      precoCusto: new FormControl(produtoModel.precoCusto, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      tamanhoId: new FormControl(produtoModel.tamanhoId, Validators.required),
      corId: new FormControl(produtoModel.corId, Validators.required),
      dataCadastro: new FormControl({ value: new Date(produtoModel.dataCadastro).toISOString().substring(0, 10), disabled: true }, [Validators.required]),
      status: new FormControl(produtoModel.status, Validators.required),
      tempoGarantia: new FormControl(produtoModel.tempoGarantia),
      peso: new FormControl(produtoModel.peso),
      altura: new FormControl(produtoModel.altura),
      largura: new FormControl(produtoModel.largura),
      comprimento: new FormControl(produtoModel.comprimento),
      observacao: new FormControl(produtoModel.observacao),
      foto: new FormControl(produtoModel.foto),
      quantidade: new FormControl(produtoModel.quantidade),
    });
  }

  updateSelectedCorIds() {
    this.selectedCorIds = this.produtoForm.controls['corId'].value;
  }

  updateSelectedTamanhoIds() {
    this.selectedTamanhoIds = this.produtoForm.controls['tamanhoId'].value;
  }

  salvar() {
    if (this.produtoForm.valid) {
      this.loadingService.startLoad();
      let produtos: ProdutoModel[] = [];
      debugger
      if (this.produtoForm.value.id <= 0 || this.produtoForm.value.id === undefined) {
        // Obtém os valores selecionados de cores e tamanhos
        const coresSelecionadas = this.lstCor.filter(cor => this.selectedCorIds.includes(cor.id));
        const tamanhosSelecionados = this.lstTamanho.filter(tamanho => this.selectedTamanhoIds.includes(tamanho.id));

        for (const cor of coresSelecionadas) {
          for (const tamanho of tamanhosSelecionados) {
            const produto: ProdutoModel = {
              id: this.produtoForm.value.id,
              descricao: this.produtoForm.value.descricao,
              referencia: this.produtoForm.value.referencia,
              codigoAuxiliar: this.produtoForm.value.codigoAuxiliar,
              setorId: this.produtoForm.value.setorId,
              linhaId: this.produtoForm.value.linhaId,
              marcaId: this.produtoForm.value.marcaId,
              colecaoId: this.produtoForm.value.colecaoId,
              fornecedorId: this.produtoForm.value.fornecedorId,
              precoVenda: this.produtoForm.value.precoVenda,
              precoCusto: this.produtoForm.value.precoCusto,
              tamanhoId: tamanho.id,
              corId: cor.id,
              dataCadastro: this.produtoForm.value.dataCadastro,
              status: this.produtoForm.value.status,
              tempoGarantia: this.produtoForm.value.tempoGarantia,
              peso: this.produtoForm.value.peso,
              altura: this.produtoForm.value.altura,
              largura: this.produtoForm.value.largura,
              comprimento: this.produtoForm.value.comprimento,
              observacao: this.produtoForm.value.observacao,
              foto: this.produtoForm.value.foto,
              quantidade: this.produtoForm.value.quantidade
            };
            produtos.push(produto);
          }
        }

      } else {


        produtos.push(this.produtoForm.value);
      }

      this.produtoService.salvarProdutos(produtos).subscribe({
        next: (result) => {
          this.loadingService.stopLoad();
          this.navigate('produto')
          this.snackbarService.exibirMensagem('Produto salvo!', 'success');
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.loadingService.stopLoad();
          this.snackbarService.exibirMensagem('Erro ao salvar Produto.', 'error');
        }
      });

    } else {

      this.loadingService.stopLoad();
      Object.keys(this.produtoForm.controls).forEach(field => {
        const control = this.produtoForm.get(field);
        if (control && control.invalid) {
          control.markAsTouched({ onlySelf: true });
          control.setErrors({ 'invalid': true });
          const element = this.elementRef.nativeElement.querySelector(`[formControlName="${field}"]`);
          if (element) {
            this.render.addClass(element, 'invalid-field');
            this.snackbarService.exibirMensagem('Preencha todos os campos.', 'error');
          }
        } else {
          const element = this.elementRef.nativeElement.querySelector(`[formControlName="${field}"]`);
          if (element) {
            this.render.removeClass(element, 'invalid-field');
            this.snackbarService.exibirMensagem('Preencha todos os campos.', 'error');
          }
        }
      });
    }

  }

  public buscarColecao() {
    this.colecaoService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      if (result.length > 0)
        this.lstColecao = result
    })
  }

  public buscarCor() {
    this.corService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      if (result.length > 0)
        this.lstCor = result
    })
  }


  public buscarLinha() {
    this.linhaService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      if (result.length > 0)
        this.lstLinha = result
    })
  }

  public buscarMarca() {
    this.marcaService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      if (result.length > 0)
        this.lstMarca = result
    })
  }
  public buscarSetor() {
    this.setorService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      if (result.length > 0)
        this.lstSetor = result
    })
  }

  public buscarTamanho() {
    this.tamanhoService.listar(this.filtroCadastrosAuxiliares).subscribe(result => {
      if (result.length > 0)
        this.lstTamanho = result
    })
  }

  public buscarFornecedor() {
    let filtro: FiltroCFModel = new FiltroCFModel();
    filtro.status = 'true';
    filtro.tipoCadastro = '2';
    this.cFService.listarCF(filtro).subscribe(result => {
      if (result.length > 0)
        this.lstFornecedor = result
    })
  }

  public calcularMarkup(): number {

    const precoCusto = this.produtoForm.value.precoCusto;
    const precoVenda = this.produtoForm.value.precoVenda;

    if (!precoCusto || !precoVenda) {
      return 0;
    }

    const markup = ((precoVenda - precoCusto) / precoCusto) * 100;
    return parseFloat(markup.toFixed(2)); // Arredonda o resultado para 2 casas decimais
  }

  public selecionarImagem() {
    const inputImagem = document.getElementById('inputImagem');
    inputImagem?.click();
  }

  public onImagemSelecionada(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imagemSelecionada = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  public removerImagem() {
    this.imagemSelecionada = '';
  }
}

