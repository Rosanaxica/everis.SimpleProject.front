import { ModeloGenerico } from './modelo_generico';


export class Superintendencia extends ModeloGenerico {

    descricao: string;

    getKey(): string {
        return "Superintendencia";
    }
}

