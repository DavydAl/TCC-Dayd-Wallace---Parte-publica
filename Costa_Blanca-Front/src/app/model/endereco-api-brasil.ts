export class APICepModel {
  public cep: string;
  public state: string;
  public city: string;
  public neighborhood: string;
  public street: string;

  constructor() {
    this.cep = '';
    this.state = '';
    this.city = '';
    this.neighborhood = '';
    this.street = '';
  }
}
