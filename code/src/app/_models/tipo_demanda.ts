import { ModeloGenerico } from './modelo_generico';


export class TipoDemanda extends ModeloGenerico {

    nome: string;

    getKey(): string {
        return "TipoDemanda";
    }
}

