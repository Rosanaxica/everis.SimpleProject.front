import { ModeloGenerico } from './modelo_generico';
import { Status } from './status.model';
import { Empresa } from './empresa.model';
import { Tecnologia } from './tecnologia.model';
import { Sigla } from './sigla.model';
import { Diretoria } from './diretoria.model';
import { Superintendencia } from './superintendencia.model';

export class Projeto extends ModeloGenerico {
    nome: string;
    codigoProjeto: string;
    qtdHorasServico1: number;
    qtdHorasServico2: number;
    qtdHorasServico3: number;
    dataInicio: Date;
    dataEntrega: Date;
    dataRecebida: Date;
    escopoProjeto: string;
    foraEscopoProjeto: string;
    premissas: string;
    empresaId: number;
    empresa: Empresa;
    statusId: number;
    duracao: number;
    status: Status;
    dataPrevista: Date;
    dataProposta: Date;
    beneficioEntregue: string;
    beneficioResidual: string;
    problemasExecucao: string;
    riscos: string;
    licoesAprendidas: string;
    ext: string;
    projetosPessoas: any;
    tecnologiaId: number;
    tecnologia: Tecnologia;
    tamanho: string;
    tipoDemanda: string;
    siglaId: number;
    sigla: Sigla;
    diretoriaId: number;
    diretoria: Diretoria;
    superintendenciaId: number;
    superintendencia: Superintendencia;
    statusProposta: string;
    tarifa: string;
    
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
