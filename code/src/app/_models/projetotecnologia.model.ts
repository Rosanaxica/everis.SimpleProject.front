import { ModeloGenerico } from './modelo_generico';
import { Projeto } from './projeto.model';
import { Pessoa } from './pessoa.model';


export class ProjetoTecnologia extends ModeloGenerico {

    projetoId: number;
    projeto: Projeto;
    tecnologiaId: number;
    tecnologia: Pessoa;

    getKey(): string {
        return 'ProjetoTecnologia';
    }
}