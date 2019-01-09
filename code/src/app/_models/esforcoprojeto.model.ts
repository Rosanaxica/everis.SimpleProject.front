import { ModeloGenerico } from './modelo_generico';
import { ProjetoPessoaModel } from './projetopessoa.model';

export class EsforcoProjetoModel extends ModeloGenerico {
    
    projetoPessoaId: number = 1;
    projetoPessoa: ProjetoPessoaModel;
    qtdHorasDia: number;
    dataInicio?: Date;
    dataFim?: Date;
    dataRegistro: Date;

    getKey(): string {
        return 'EsforcoProjeto';
    }
}