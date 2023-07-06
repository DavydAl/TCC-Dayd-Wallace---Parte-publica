export class ItensRetiradaModel {
  public id: number;
  public produtoNome: string;
  public produtoId: number;
  public quantidade: number;
  public valorTotalProdutos: number;
  public valorUnitario: number;
  public desconto: number;

  constructor() {
    this.id = 0;
    this.produtoNome = '';
    this.produtoId = 0;
    this.quantidade = 0;
    this.valorTotalProdutos = 0;
    this.valorUnitario = 0;
    this.desconto = 0;
  }
}