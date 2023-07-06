export class FiltroCFModel {
  public id?: string;
  public name: string;
  public status: string;
  public cpfCnpj?: string;
  public tipoCadastro: string;

  constructor() {
    this.status = '';
    this.cpfCnpj = '';
    this.tipoCadastro = '';
    this.id = '';
    this.name = "";
  }
}