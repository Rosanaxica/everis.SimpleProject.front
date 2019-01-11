import { ModeloGenerico } from './modelo_generico';

export class Ferramenta extends ModeloGenerico {

    descricao: string;

    getKey(): string {
        return 'Ferramenta';
    }

}