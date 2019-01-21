import { ModeloGenerico } from './modelo_generico';
import { Pessoa } from './pessoa.model';
import { Comunidade } from './comunidade.model';

export class Squad extends ModeloGenerico {
    nome: string;
    dataInicio: Date;
    isSquad: number;
    gerenteResponsavel: string;
    gerenteComunidade: string;
    pessoa: Pessoa;
    pessoaId: number;
    comunidade: Comunidade;
    comunidadeId: number;

    getKey(): string {
      return 'squad';
    }  
}