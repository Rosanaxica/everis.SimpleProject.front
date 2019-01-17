import { ModeloGenerico } from './modelo_generico';
import { Status } from './status.model';

export class Projeto extends ModeloGenerico {
    nome: string;
    codigoProjeto: string;
    qtdHorasServico1: number;
    qtdHorasServico2: number;
    qtdHorasServico3: number;
    dataInicio: Date;
    dataEntrega: Date;
    escopoProjeto: string;
    foraEscopoProjeto: string;
    premissas: string;
    empresaId: number;
    empresa: string;
    statusId: number;
    status: Status;
    dataPrevista: Date;
    beneficioEntregue: string;
    beneficioResidual: string;
    problemasExecucao: string;
    riscos: string;
    licoesAprendidas: string;
    centroCusto: string;
    projetosPessoas: any;

    getKey(): string {
        return 'Projeto'
    }

    getStatusString(): string {
        return this.status.toString();
    }

}

// export enum Status {
//     EmExecucao = 1,
//     Concluido = 2,
//     Cancelado = 3,
//     Congelado = 4,
//     PendenteCliente = 5,
//     ControleQualidade = 6
// }
