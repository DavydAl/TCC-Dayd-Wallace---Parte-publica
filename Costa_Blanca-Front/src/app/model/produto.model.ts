import { IProdutoInterface } from "../interfaces/produto";

export class ProdutoModel implements IProdutoInterface {
  public id: number;
  public descricao: string;
  public referencia: string;
  public codigoAuxiliar: string;
  public setorId: number;
  public linhaId: number;
  public marcaId: number;
  public colecaoId: number;
  public fornecedorId: number;
  public precoVenda: number;
  public precoCusto: number;
  public tamanhoId: number;
  public corId: number;
  public dataCadastro: Date;
  public status: boolean;
  public tempoGarantia: string;
  public peso: string;
  public altura: string;
  public largura: string;
  public comprimento: string;
  public observacao: string;
  public foto: string;
  public quantidade: number;

  constructor() {
    this.id = 0;
    this.descricao = '';
    this.referencia = '';
    this.codigoAuxiliar = '';
    this.setorId = 0;
    this.linhaId = 0;
    this.marcaId = 0;
    this.colecaoId = 0;
    this.fornecedorId = 0;
    this.precoVenda = 0;
    this.precoCusto = 0;
    this.tamanhoId = 0;
    this.corId = 0;
    this.dataCadastro = new Date();
    this.status = true;
    this.tempoGarantia = '0';
    this.peso = '0';
    this.altura = '0';
    this.largura = '0';
    this.comprimento = '0';
    this.observacao = '';
    this.foto = '';
    this.quantidade = 0;
  }
}

export class QtdProdutoModel {
  public id: number;
  public quantidade: number;

  constructor() {
    this.id = 0;
    this.quantidade = 0;
  }
}
