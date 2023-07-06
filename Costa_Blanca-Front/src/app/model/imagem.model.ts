export class ImagemModel {
  id: number;
  imagem: ArrayBuffer | Blob | null;
  usuarioId: number | null;
  funcionarioId: number | null;
  produtoId: number | null;

  constructor() {
    this.id = 0;
    this.imagem = null;
    this.usuarioId = null;
    this.funcionarioId = null;
    this.produtoId = null;
  }
}
