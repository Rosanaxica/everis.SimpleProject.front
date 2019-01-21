import { ModeloGenerico } from './modelo_generico';
import { Pessoa } from './pessoa.model';
import { TipoTelefone } from './tipo_telefone.model';

export class Telefone extends ModeloGenerico {

    numeroTelefone: string;
    tipoId: number;
    tipoTelefone: TipoTelefone;
    pessoaId: number;
    pessoa: Pessoa;

    getKey(): string {
        return 'telefone';
    }
}
