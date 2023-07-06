import { IEnderecoInterface } from "./endereco";

export interface IGetCnpjInterface {
  status: string;
  cnpj: string;
  tipo: string;
  nome: string;
  fantasia: string;
  endereco: IEnderecoInterface;
  contato: {
    telefone: string;
    email: string;
  };
}