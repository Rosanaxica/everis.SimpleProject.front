import { ModeloGenerico } from './modelo_generico';
import { Projeto } from './projeto.model';
import { Pessoa } from './pessoa.model';

export class ProjetoPessoa extends ModeloGenerico {

    projetoId: number;
    projeto: Projeto;
    pessoaId: number;
    pessoa: Pessoa;

    getKey(): string {
        return 'ProjetoPessoa';
    }
}