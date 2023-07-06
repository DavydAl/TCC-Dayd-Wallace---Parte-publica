import { IContatoInterface } from "./contato";
import { IEnderecoInterface } from "./endereco";
export interface IClienteFornecedorInterface {
  id: number
  cpfCnpj: string;
  tipoCadastro: number;
  nomeRazao: string;
  nomeFantasia: string;
  numeroDocEstran: string;
  rg: string;
  orgaoEmissor: string;
  dataNascimento: Date;
  estadoCivilId: string;
  sexoId: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  telefone: string;
  telefone2: string;
  email: string;
  site: string;
  observacoes: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  status: boolean;
} 