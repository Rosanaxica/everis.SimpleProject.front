import { ModeloGenerico } from './modelo_generico';

export class Funcao extends ModeloGenerico {

    descricao: string;

    getKey(): string {
        return "Funcao";
    }

}
