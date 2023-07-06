import { IUsuarioInterface } from "../interfaces/usuario";

export class UsuarioModel implements IUsuarioInterface {
  public id: number;
  public email: string;
  public senha: string;
  public status: boolean;
  public funcionarioId: number;
  public perfilGerencial: boolean;
  public admin: boolean;
  public nome: string;
  public cpf: string;
  public foto: Uint8Array | null; // Alteração: usando Uint8Array para representar a imagem

  constructor() {
    this.id = 0;
    this.email = '';
    this.senha = '';
    this.status = true;
    this.funcionarioId = 0;
    this.perfilGerencial = false;
    this.admin = false;
    this.nome = '';
    this.cpf = '';
    this.foto = null; // Alteração: inicialmente nulo, será preenchido com a imagem
  }
}
