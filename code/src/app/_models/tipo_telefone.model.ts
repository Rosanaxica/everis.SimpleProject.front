import { ModeloGenerico } from './modelo_generico';

export class TipoTelefone extends ModeloGenerico {

    descricao: string;


    getKey(): string {
        return "TipoTelefone";
    }

}
