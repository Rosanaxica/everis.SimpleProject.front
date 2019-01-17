import { ModeloGenerico } from './modelo_generico';
import { Ferramenta } from './ferramenta.model';

export class AcessoFerramenta extends ModeloGenerico {

    colaboradorId?: number;
    ferramentaId: number;


    getKey(): string {
        return "AcessoFerramenta";
    }

}