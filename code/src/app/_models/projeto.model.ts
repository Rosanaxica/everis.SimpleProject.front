import { ModeloGenerico } from './modelo_generico';

export class Projeto extends ModeloGenerico {
    nome: string;
    qtdHorasServico1: number;
    qtdHorasServico2: number;
    qtdHorasServico3: number;
    dataInicio: Date;
    dataEntrega: Date;
    escopoProjeto: string;
    foraEscopoProjeto: string;
    premissas: string;
    idEmpresa: number;
    empresa: string;
    status: string;
    dataPrevista: Date;
    beneficioEntregue: string;
    problemasExecucao: string;
    beneficioResidual: string;
    riscos: string;
    licoesAprendidas: string;
    centroCusto: string;

    getKey(): string {
        return 'projeto'
    }

}
