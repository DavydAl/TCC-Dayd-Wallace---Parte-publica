export interface IUsuarioInterface {
  id: number;
  email: string;
  senha: string;
  status: boolean;
  funcionarioId: number;
  perfilGerencial: boolean;
  admin: boolean;
  nome: string;
  cpf: string;
  foto: Uint8Array | null; // Permitindo valor nulo
}
