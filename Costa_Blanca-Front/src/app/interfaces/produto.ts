export interface IProdutoInterface {
  id: number;
  descricao: string;
  referencia: string;
  codigoAuxiliar: string;
  setorId: number;
  linhaId: number;
  marcaId: number;
  colecaoId: number;
  fornecedorId: number;
  precoVenda: number;
  precoCusto: number;
  tamanhoId: number;
  corId: number;
  dataCadastro: Date;
  status: boolean;
  tempoGarantia: string;
  peso: string;
  altura: string;
  largura: string;
  comprimento: string;
  observacao: string;
  foto: string;
  quantidade: number;
}