import { ModeloGenerico } from './modelo_generico';

export class Telefone extends ModeloGenerico {

    id: number;
    numeroTelefone: string;
    tipoTelefone: TipoTelefone;
    pessoaId: number;

    getKey(): string {
        return 'telefone';
    }
}

export enum TipoTelefone {
    Residencial = 1,
    Particular = 2,
    Empresarial = 3
}
