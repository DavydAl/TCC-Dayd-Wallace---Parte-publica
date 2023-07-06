import { IUsuarioInterface } from "../../interfaces/usuario";

export class FiltroHomeModel {
  public ano: number;
  public mes: number;

  constructor() {
    this.ano = 0;
    this.mes = 0;
  }
}
