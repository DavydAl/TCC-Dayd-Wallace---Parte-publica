import { IDadosEmpresaInterface } from "../interfaces/dados-empresa";

export class DadosEmpresaModel implements IDadosEmpresaInterface {
  bairroEscritorio: string;
  bairroLoja: string;
  cepEscritorio: string;
  cepLoja: string;
  cidadeEscritorio: string;
  cidadeLoja: string;
  cnpj: string;
  complementoEscritorio: string;
  complementoLoja: string;
  cpfResponsavel: string;
  email: string;
  emailResponsavel: string;
  estadoEscritorio: string;
  estadoLoja: string;
  id: number;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  logradouroEscritorio: string;
  logradouroLoja: string;
  nomeFantasia: string;
  nomeResponsavel: string;
  numeroEscritorio: string;
  numeroLoja: string;
  razaoSocial: string;
  site: string;
  telefone: string;
  telefone2: string;
  telefoneResponsavel: string;

  constructor() {
    this.bairroEscritorio = "";
    this.bairroLoja = "";
    this.cepEscritorio = "";
    this.cepLoja = "";
    this.cidadeEscritorio = "";
    this.cidadeLoja = "";
    this.cnpj = "";
    this.complementoEscritorio = "";
    this.complementoLoja = "";
    this.cpfResponsavel = "";
    this.email = "";
    this.emailResponsavel = "";
    this.estadoEscritorio = "";
    this.estadoLoja = "";
    this.id = 0;
    this.inscricaoEstadual = "";
    this.inscricaoMunicipal = "";
    this.logradouroEscritorio = "";
    this.logradouroLoja = "";
    this.nomeFantasia = "";
    this.nomeResponsavel = "";
    this.numeroEscritorio = "";
    this.numeroLoja = "";
    this.razaoSocial = "";
    this.site = "";
    this.telefone = "";
    this.telefone2 = "";
    this.telefoneResponsavel = "";
  }
}
