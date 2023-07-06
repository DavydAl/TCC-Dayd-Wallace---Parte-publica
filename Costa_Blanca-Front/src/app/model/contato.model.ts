import { IContatoInterface } from "../interfaces/contato";

export class ContatoModel implements IContatoInterface {
  public telefone: number;
  public telefone2: number;
  public email: string;
  public site: string;

  constructor() {
    this.telefone = 0;
    this.telefone2 = 0;
    this.email = "";
    this.site = "";
  }
}