import { ModeloGenerico } from './modelo_generico';

export class AreaContratante extends ModeloGenerico {

    descricao: string;

    getKey(): string {
        return "AreaContratante";
    }

}
