import { ModeloGenerico } from './modelo_generico';
import { Pessoa } from './pessoa.model';
import { Comunidade } from './comunidade.model';

export class Squad extends ModeloGenerico {
    nome: string;
    datainicio: Date;
    gerenteresponsavel: string;
    gerentecomunidade: string;
    pessoa: Pessoa;
    pessoaid: number;
    comunidade: Comunidade;
    comunidadeid: number;

    getKey(): string {
      return 'squad';
    }  
}