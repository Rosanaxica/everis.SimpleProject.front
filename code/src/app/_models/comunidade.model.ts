import { ModeloGenerico } from './modelo_generico';

export class Comunidade extends ModeloGenerico {
    nome: string;

    getKey(): string {
      return 'comunidade';
    }  
}