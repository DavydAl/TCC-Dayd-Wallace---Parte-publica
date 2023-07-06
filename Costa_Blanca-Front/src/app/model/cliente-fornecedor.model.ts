import { IClienteFornecedorInterface } from "../interfaces/cliente-fornecedor";

export class ClienteFornecedorModel implements IClienteFornecedorInterface {
  public id: number;
  public cpfCnpj: string;
  public tipoCadastro: number;
  public nomeRazao: string;
  public nomeFantasia: string;
  public numeroDocEstran: string;
  public rg: string;
  public orgaoEmissor: string;
  public dataNascimento: Date;
  public estadoCivilId: string;
  public sexoId: string;
  public logradouro: string;
  public numero: string;
  public complemento: string;
  public cep: string;
  public bairro: string;
  public cidade: string;
  public estado: string;
  public telefone: string;
  public telefone2: string;
  public email: string;
  public site: string;
  public observacoes: string;
  public inscricaoEstadual: string;
  public inscricaoMunicipal: string;
  public status: boolean;

  constructor() {
    this.id = 0;
    this.tipoCadastro = 0;
    this.nomeRazao = "";
    this.nomeFantasia = "";
    this.numeroDocEstran = "";
    this.rg = "";
    this.orgaoEmissor = "";
    this.dataNascimento = new Date();
    this.estadoCivilId = "";
    this.sexoId = "";
    this.logradouro = "";
    this.numero = "";
    this.complemento = "";
    this.cep = "";
    this.bairro = "";
    this.cidade = "";
    this.estado = "";
    this.telefone = "";
    this.telefone2 = "";
    this.email = "";
    this.site = "";
    this.observacoes = "";
    this.inscricaoEstadual = "";
    this.inscricaoMunicipal = "";
    this.status = true;
    this.cpfCnpj = '';
  }
}