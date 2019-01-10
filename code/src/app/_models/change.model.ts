import { ModeloGenerico } from './modelo_generico';
import { Projeto } from './projeto.model';

export class Change extends ModeloGenerico {
  descricao: string;
  dataHoraCadastro: Date = new Date();
  projetoId: number;
  projeto?: Projeto;
  qtdHorasServico1: number;
  qtdHorasServico2: number;
  qtdHorasServico3: number;

  getKey(): string {
    return 'Change';
  }

}
