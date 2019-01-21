import { ModeloGenerico } from './modelo_generico';

export class TipoPessoa extends ModeloGenerico {

    descricao: string;

    getKey(): string {
        return "TipoPessoa";
    }

}
