import { ItensRetiradaModel } from "./itens-retirada.model";

export class RetirdaProdutoModel {
  public id: number;
  public ticket: number;
  public dataRetirada: string;
  public dataInicio?: string;
  public dataFim?: string;
  public clienteId: number;
  public funcionarioId: number;
  public usuarioId: number;
  public dataCancelamento?: string;
  public formaRetiradaId: number;
  public cancelado: boolean;
  public valorTotal: number;
  public obs: string;
  public items: ItensRetiradaModel[];

  constructor() {
    this.dataRetirada = '';
    this.dataCancelamento = undefined;
    this.usuarioId = 0;
    this.funcionarioId = 0;
    this.ticket = 0;
    this.cancelado = false;
    this.dataInicio = undefined;
    this.dataFim = undefined;
    this.id = 0;
    this.clienteId = 0;
    this.formaRetiradaId = 0;
    this.valorTotal = 0;
    this.items = [];
    this.obs = '';
  }
}

export class CancelarRetirdaProdutoModel {
  public obs: string;
  public id: number;

  constructor() {
    this.obs = '';
    this.id = 0;
  }
}