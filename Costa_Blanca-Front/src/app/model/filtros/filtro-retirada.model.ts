export class FiltroRetirdaProdutoModel {
  public dataInicio?: string;
  public dataFim?: string;
  public usuarioId?: string;
  public funcionarioId?: string;
  public ticket?: string;
  public cancelado: string;

  constructor() {
    this.dataInicio = '';
    this.dataFim = '';
    this.usuarioId = '';
    this.funcionarioId = '';
    this.ticket = '';
    this.cancelado = '';
  }
}