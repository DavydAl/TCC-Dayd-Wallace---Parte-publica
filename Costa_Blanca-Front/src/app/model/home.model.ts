
export class HomeRankingModel {
  public descricao: string;
  public porcentagem: number;

  constructor() {
    this.descricao = '';
    this.porcentagem = 0
  }
}

class DadosSemanaModel {
  public semana1: number;
  public semana2: number;
  public semana3: number;
  public semana4: number;
  constructor() {
    this.semana1 = 0;
    this.semana2 = 0;
    this.semana3 = 0;
    this.semana4 = 0;

  }
}

export class HomeSemanasModel {
  public mesAtual: DadosSemanaModel;
  public mesAnterior: DadosSemanaModel;

  constructor() {
    this.mesAtual = new DadosSemanaModel();
    this.mesAnterior = new DadosSemanaModel();
  }
}


export class HomeMovimentacaoModel {
  public itensRetiradosDoEstoque: Record<string, number>;
  public totalMovimentado: Record<string, number>;
  public itensCancelados: Record<string, number>;

  constructor(data: any) {
    this.itensRetiradosDoEstoque = data['Itens Retirados do Estoque'] || {};
    this.totalMovimentado = data['Total Movimentado'] || {};
    this.itensCancelados = data['Itens Cancelados'] || {};
  }
}
