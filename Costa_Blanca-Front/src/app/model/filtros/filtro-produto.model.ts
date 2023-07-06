export class FiltroProdutoModel {
  public id?: string;
  public descricao?: string;
  public referencia?: string;
  public codigoAuxiliar?: string;
  public setorId?: string;
  public linhaId?: string;
  public marcaId?: string;
  public colecaoId?: string;
  public fornecedorId?: string;
  public precoVenda?: string;
  public precoCusto?: string;
  public tamanhoId?: string;
  public corId?: string;
  public status?: string;
  public isRetirada: string;


  constructor() {
    this.id = '';
    this.descricao = '';
    this.referencia = '';
    this.codigoAuxiliar = '';
    this.setorId = '';
    this.linhaId = '';
    this.marcaId = '';
    this.colecaoId = '';
    this.fornecedorId = '';
    this.precoVenda = '';
    this.precoCusto = '';
    this.tamanhoId = '';
    this.corId = '';
    this.status = '';
    this.isRetirada = '';
  }
}