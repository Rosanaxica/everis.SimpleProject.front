import { ModeloGenerico } from './modelo_generico';
import { ProjetoPessoaModel } from './projetopessoa.model';
import { TipoFaseModel } from './tipo_fase.model';

export class FaseModel extends ModeloGenerico {
    
    projetoPessoaId: number;
    projetoPessoa: ProjetoPessoaModel;
    tipoFaseId: number;
    tipoFase: TipoFaseModel;
    qtdHorasDia: number;
    dataInicio?: Date;
    dataFim?: Date;
    observacao: string;
    codigoFase: number;
    dataRegistro: Date;

    getKey(): string {
        return 'Fase';
    }
}