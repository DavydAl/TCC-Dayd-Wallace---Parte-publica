export class APICNPJModel {
  public cnpj: string;
  public razao_social: string
  public nome_fantasia: string
  public descricao_tipo_logradouro: string
  public logradouro: string
  public numero: string
  public complemento: string
  public cep: number;
  public email: string;
  public ddd_telefone_1: string
  public ddd_telefone_2: string
  public bairro: string;
  public data_inicio_atividade: string
  public uf: string;
  public municipio: string;

  constructor() {
    this.cnpj = '';
    this.razao_social = '';
    this.nome_fantasia = '';
    this.descricao_tipo_logradouro = '';
    this.logradouro = '';
    this.numero = '';
    this.complemento = '';
    this.cep = 0;
    this.email = '';
    this.ddd_telefone_1 = '';
    this.ddd_telefone_2 = '';
    this.data_inicio_atividade = '';
    this.bairro = '';
    this.uf = '';
    this.municipio = '';
  }
}