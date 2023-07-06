import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TipoCadastroEnum } from 'src/app/enum/tipo-cadastro.enum';
import { CadAuxiliaresModel } from 'src/app/model/cadastros-auxilares.model';
import { ClienteFornecedorModel } from 'src/app/model/cliente-fornecedor.model';
import { FiltroCadastroAuxiliarModel } from 'src/app/model/filtros/filtro-cadastro-auxiliar.model';
import { FiltroProdutoModel } from 'src/app/model/filtros/filtro-produto.model';
import { MenuManutencaoModel } from 'src/app/model/filtros/menu-manutencao.model';
import { ClienteFornecedorService } from 'src/app/services/clicente-fornecedor.service';
import { ColecaoService } from 'src/app/services/colecao.service';
import { CorService } from 'src/app/services/cor.service';
import { EstoqueService } from 'src/app/services/estoque.service';
import { LinhaService } from 'src/app/services/linha.service';
import { MarcaService } from 'src/app/services/marca.service';
import { SetorService } from 'src/app/services/setor.service';
import { TamanhoService } from 'src/app/services/tamanho.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoModel } from 'src/app/model/produto.model';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { ProdutoService } from 'src/app/services/produtos.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent extends AppComponent implements OnInit {
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
  public lstProduto: ProdutoModel[] = [];

  public formGroup!: FormGroup;
  public dataSource = new MatTableDataSource<ProdutoModel>();

  public snackbarService: SnackbarService;
  public produtoService: ProdutoService;

  displayedColumns: string[] = [];

  constructor(injector: Injector, private formBuilder: FormBuilder) {
    super(injector);
    this.snackbarService = injector.get(SnackbarService);
    this.produtoService = injector.get(ProdutoService);
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      // pageSize: [200]
    });

    this.iniciar();
  }


  updateColumnValues(valor: string) {
    const column = this.displayedColumns[this.displayedColumns.indexOf(valor)];
    const firstValue = this.lstProduto[0][column as keyof ProdutoModel];

    for (let i = 0; i < this.lstProduto.length; i++) {
      this.lstProduto[i][column as keyof ProdutoModel] = firstValue as never;
    }

    this.dataSource.data = [...this.lstProduto];
  }


  getColumnKey(columnIndex: number): keyof ProdutoModel {
    const keys = Object.keys(this.lstProduto[0]) as Array<keyof ProdutoModel>;
    return keys[columnIndex];
  }

  iniciar() {

    this.loadingService.startLoad();
    this.recuperarListasDoLocalStorage();
    this.dataSource.data = [...this.lstProduto];
    this.loadingService.stopLoad();
  }

  public recuperarListasDoLocalStorage(): void {
    const lstProduto = localStorage.getItem('lstProduto');
    if (lstProduto) {
      this.lstProduto = JSON.parse(lstProduto);
    }

    const lstColecao = localStorage.getItem('lstColecao');
    if (lstColecao) {
      this.lstColecao = JSON.parse(lstColecao);
    }

    const lstCor = localStorage.getItem('lstCor');
    if (lstCor) {
      this.lstCor = JSON.parse(lstCor);
    }

    const lstEstoque = localStorage.getItem('lstEstoque');
    if (lstEstoque) {
      this.lstEstoque = JSON.parse(lstEstoque);
    }

    const lstLinha = localStorage.getItem('lstLinha');
    if (lstLinha) {
      this.lstLinha = JSON.parse(lstLinha);
    }

    const lstMarca = localStorage.getItem('lstMarca');
    if (lstMarca) {
      this.lstMarca = JSON.parse(lstMarca);
    }

    const lstSetor = localStorage.getItem('lstSetor');
    if (lstSetor) {
      this.lstSetor = JSON.parse(lstSetor);
    }

    const lstTamanho = localStorage.getItem('lstTamanho');
    if (lstTamanho) {
      this.lstTamanho = JSON.parse(lstTamanho);
    }

    const lstFornecedor = localStorage.getItem('lstFornecedor');
    if (lstFornecedor) {
      this.lstFornecedor = JSON.parse(lstFornecedor);
    }



    const menuManutencao = localStorage.getItem('menuManutencao');
    if (menuManutencao) {
      this.menuManutencao = JSON.parse(menuManutencao);
      const self = this;
      this.displayedColumns = Object.keys(this.menuManutencao).filter(function (key) {
        return self.menuManutencao[key as keyof typeof self.menuManutencao] === true;
      });
    }

  }


  // salvar() {
  //   const requiredFields = Array.from(document.querySelectorAll('input[required]'));

  //   let allFieldsFilled = true;

  //   const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll('input[required]'));

  //   inputs.forEach((field: HTMLInputElement) => {
  //     if (field.value === '') {
  //       field.style.borderColor = 'red';
  //     } else {
  //       field.style.borderColor = '';
  //     }
  //   });

  //   if (allFieldsFilled) {
  //     this.produtoService.salvarProdutos(this.dataSource.data).subscribe({
  //       next: (result) => {
  //         console.log(result);
  //         this.loadingService.stopLoad();
  //         this.navigate('produto/manutencao-massa')
  //         this.snackbarService.exibirMensagem('Produto salvo!', 'success');
  //       },
  //       error: (error: HttpErrorResponse) => {
  //         console.log(error);
  //         this.loadingService.stopLoad();
  //         this.snackbarService.exibirMensagem('Erro ao salvar Produto.', 'error');
  //       }
  //     });
  //   } else {
  //     this.snackbarService.exibirMensagem('Necessário preencher todos os campos!', 'error');
  //   }
  // }


  salvar() {
    this.loadingService.startLoad();
    const requiredFields = Array.from(document.querySelectorAll('input[required]'));

    let allFieldsFilled = true;

    const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll('input[required]'));

    inputs.forEach((field: HTMLInputElement) => {
      if (field.value === '') {
        field.style.borderColor = 'red';
        allFieldsFilled = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (allFieldsFilled) {
      this.produtoService.salvarProdutos(this.dataSource.data).subscribe({
        next: (result) => {
          this.loadingService.stopLoad();
          this.lstProduto = this.dataSource.data;
          localStorage.setItem('lstProduto', JSON.stringify(this.lstProduto));
          this.navigate('produto/manutencao')
          this.snackbarService.exibirMensagem('Produtos salvos com sucesso!', 'success');
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.loadingService.stopLoad();
          this.snackbarService.exibirMensagem('Erro ao salvar Produtos.', 'error');
        }
      });
    } else {
      this.snackbarService.exibirMensagem('Necessário preencher todos os campos!', 'error');
    }
    this.loadingService.stopLoad();
  }


}
