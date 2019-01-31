import { ModeloGenerico } from './modelo_generico';
import { Squad } from './squad.model';
import { Pessoa } from './pessoa.model';

export class SquadPessoa extends ModeloGenerico {

    squadId: number;
    squad: Squad;
    pessoaId: number;
    pessoa: Pessoa;
    // atribuicaoId: number;
    // atribuicao: ProjetoPessoaAtribuicao;
    // responsavel: boolean;

    getKey(): string {
        return 'SquadPessoa';
    }
}