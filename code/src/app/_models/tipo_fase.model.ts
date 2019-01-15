import { ModeloGenerico } from './modelo_generico';

export class TipoFaseModel extends ModeloGenerico {

    nome: string;
    getKey() {
        return 'TipoFase';
    }
}