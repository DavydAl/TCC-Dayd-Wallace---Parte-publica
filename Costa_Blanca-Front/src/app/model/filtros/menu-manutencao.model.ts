export class MenuManutencaoModel {

  public descricao: boolean;
  public corId: boolean;
  public tamanhoId: boolean;
  public referencia: boolean;
  public codigoAuxiliar: boolean;
  public setorId: boolean;
  public linhaId: boolean;
  public marcaId: boolean;
  public colecaoId: boolean;
  public fornecedorId: boolean;
  public precoCusto: boolean;
  public precoVenda: boolean;
  public quantidade: boolean;

  constructor() {
    this.descricao = false;
    this.referencia = false;
    this.codigoAuxiliar = false;
    this.setorId = false;
    this.linhaId = false;
    this.marcaId = false;
    this.colecaoId = false;
    this.fornecedorId = false;
    this.precoVenda = false;
    this.precoCusto = false;
    this.tamanhoId = false;
    this.corId = false;
    this.quantidade = false;
  }
}