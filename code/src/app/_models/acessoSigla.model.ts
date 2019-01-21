import { ModeloGenerico } from './modelo_generico';
import { Colaborador } from './colaborador.model';
import { Sigla } from './sigla.model';

export class AcessoSigla extends ModeloGenerico {

    colaboradorId: number;
    colaborador: Colaborador;
    siglaId: number;
    sigla: Sigla;

    getKey(): string {
        return "AcessoSigla";
    }

}