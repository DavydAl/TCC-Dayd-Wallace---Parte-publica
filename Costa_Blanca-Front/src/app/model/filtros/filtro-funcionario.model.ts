
export class FiltroFuncionarioModel {
  public nome: string;
  public matricula: string;
  public cpf: string;
  public status: string;

  constructor() {
    this.nome = '';
    this.cpf = '';
    this.matricula = '';
    this.status = '';
  }
}