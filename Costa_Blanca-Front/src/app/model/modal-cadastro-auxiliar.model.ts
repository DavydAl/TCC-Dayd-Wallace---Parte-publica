
export class CadastroAuxiliarModel {
  public id: number;
  public titulo: string;
  public nome: string;
  public tipoCadastro: number;
  public status: boolean;

  public tituloSelect: string;

  constructor() {
    this.id = 0;
    this.titulo = '';
    this.nome = '';
    this.tipoCadastro = 0
    this.status = false;
    this.tituloSelect = '';
  }
}