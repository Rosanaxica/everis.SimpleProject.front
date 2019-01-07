import { ModeloGenerico } from './modelo_generico';

export class Anexo extends ModeloGenerico {
  descricao: string;
  path: string;
  tipo: string;
  idProjeto: number;

  getKey(): string {
    return 'anexo';
  }
}
