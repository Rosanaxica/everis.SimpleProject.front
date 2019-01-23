import { ModeloGenerico } from './modelo_generico';

export class Diretoria extends ModeloGenerico {

    descricao: string;

    getKey(): string {
        return "DiretoriaContratante";
    }

}