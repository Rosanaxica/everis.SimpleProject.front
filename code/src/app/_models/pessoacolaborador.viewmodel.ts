import { Colaborador } from './colaborador.model';
import { Pessoa } from './pessoa.model';
import { ModeloGenerico } from './modelo_generico';
import { AcessoFerramenta } from './acessoFerramenta';

export class PessoaColaboradorViewModel extends ModeloGenerico {
    colaborador: Colaborador;
    pessoa: Pessoa;

    getKey() {
        return 'pessoa/criarpessoacolaborador';
    }
}
