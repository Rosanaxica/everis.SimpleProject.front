import { ModeloGenerico } from './modelo_generico';

export class PoloAcesso extends ModeloGenerico {

    descricao: string;

    getKey(): string {
        return "PoloAcesso";
    }

}
