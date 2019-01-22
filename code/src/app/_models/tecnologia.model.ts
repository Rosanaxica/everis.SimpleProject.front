import { ModeloGenerico } from './modelo_generico';


export class Tecnologia extends ModeloGenerico {

    nome: string;

    getKey(): string {
        return "Tecnologia";
    }
}

