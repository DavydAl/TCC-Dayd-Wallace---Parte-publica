import { IEnderecoInterface } from "../interfaces/endereco";

export class EnderecoModel implements IEnderecoInterface {
  public logradouro: string;
  public numero: string;
  public complemento: string;
  public cep: string;
  public bairro: string;
  public cidade: string;
  public estado: string;

  constructor() {
    this.logradouro = "";
    this.numero = "";
    this.complemento = "";
    this.cep = "";
    this.bairro = "";
    this.cidade = "";
    this.estado = "";
  }
}