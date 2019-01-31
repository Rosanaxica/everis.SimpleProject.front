import { ModeloGenerico } from './modelo_generico';
import { Projeto } from './projeto.model';
import { Squad } from './squad.model';

export class ProjetoSquad extends ModeloGenerico {

    projetoId: number;
    projeto: Projeto;
    squadId: number;
    squad: Squad;

    getKey(): string {
        return 'ProjetoSquad';
    }
}