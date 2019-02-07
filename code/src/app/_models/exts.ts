import { ModeloGenerico } from './modelo_generico';


export class Exts extends ModeloGenerico {

    nome: string;
    descricao: string;

    getKey(): string {
        return "Exts";
    }
}

