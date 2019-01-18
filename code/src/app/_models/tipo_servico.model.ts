import { ModeloGenerico } from './modelo_generico';

export class TipoServico extends ModeloGenerico {

    descricao: string;

    getKey(): string {
        return "TipoServico";
    }

}
