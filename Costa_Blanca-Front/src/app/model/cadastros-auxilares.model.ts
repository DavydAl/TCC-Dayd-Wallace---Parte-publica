import { ICadAuxiliaresInterface } from "../interfaces/cadastros-auxiliares";

export class CadAuxiliaresModel implements ICadAuxiliaresInterface {
  public id: number;
  public descricao: string;
  public status: boolean;



  constructor() {
    this.descricao = '';
    this.status = false;
    this.id = 0;
  }
}