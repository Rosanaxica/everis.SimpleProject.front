import { ModeloGenerico } from './modelo_generico';

export class Status extends ModeloGenerico {
  codigo: string;
  descricao: string;
  getKey(): string {
    return 'status';
  }
  
  getStatuString(): string {
    return this.descricao.toString();
  }
}

