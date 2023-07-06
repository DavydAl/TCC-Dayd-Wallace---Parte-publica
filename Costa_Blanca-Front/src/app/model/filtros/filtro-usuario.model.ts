
export class FiltroUsuarioModel {
  public email?: string;
  public nome?: string;
  public cpf?: string;
  public status?: string;

  constructor() {
    this.email = undefined;
    this.nome = undefined;
    this.cpf = undefined;
    this.status = undefined;
  }
}