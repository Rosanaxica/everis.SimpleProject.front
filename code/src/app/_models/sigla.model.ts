import { ModeloGenerico } from './modelo_generico';
import { Colaborador } from './colaborador.model';

export class Sigla extends ModeloGenerico {

    descricao: string;

    getKey(): string {
        return "Sigla";
    }
}