import { ModeloGenerico } from './modelo_generico';

export class ProjetoPessoaAtribuicao extends ModeloGenerico {

    atribuicao: string;

    getKey(): string {
        return 'ProjetoPessoaAtribuicao';
    }
}