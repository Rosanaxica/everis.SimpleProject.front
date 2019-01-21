import { ModeloGenerico } from './modelo_generico';
import { Projeto } from './projeto.model';
import { Pessoa } from './pessoa.model';
import { ProjetoPessoaAtribuicao } from './projetopessoaatribuicao.model.';

export class ProjetoPessoa extends ModeloGenerico {

    projetoId: number;
    projeto: Projeto;
    pessoaId: number;
    pessoa: Pessoa;
    atribuicaoId: number;
    atribuicao: ProjetoPessoaAtribuicao;
    responsavel: boolean;

    getKey(): string {
        return 'ProjetoPessoa';
    }
}