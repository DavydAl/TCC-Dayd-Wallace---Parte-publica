
export class ModalConfirmacaoModel {
  public titulo: string;
  public descricao: string;
  public confirmacao: boolean;
  public valorId: number;

  constructor() {
    this.titulo = '';
    this.descricao = '';
    this.confirmacao = false;
    this.valorId = 0
  }
}