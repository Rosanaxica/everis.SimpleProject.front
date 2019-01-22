import { ModeloGenerico } from './modelo_generico';
import { TipoFaseModel } from './tipo_fase.model';
import { Projeto } from './projeto.model';
import { Pessoa } from './pessoa.model';

export class FaseModel extends ModeloGenerico {

    constructor() {
        super();
        this.projeto = new Projeto();
        this.pessoa = new Pessoa();
        this.tipoFase = new TipoFaseModel();
    }

    projetoId: number;
    projeto: Projeto;
    pessoaId: number;
    pessoa: Pessoa;
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