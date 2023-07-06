import { IPermissaoSistemaInterface } from "../interfaces/permissao-sistema";

export class PermissaoSistemaModel implements IPermissaoSistemaInterface {
  public permissaoId: number;
  public nome: string;
  public ativo: boolean;


  constructor() {
    this.permissaoId = 0;
    this.nome = '';
    this.ativo = false;
  }
}