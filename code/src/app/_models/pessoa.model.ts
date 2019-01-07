import { Colaborador } from './colaborador.model';
import { Empresa } from './empresa.model';
import { Telefone } from './telefone.model';
import { ModeloGenerico } from './modelo_generico';


export class Pessoa extends ModeloGenerico {

    empresaId: number;
    nome: string;
    tipo: TipoPessoa;
    email: string;
    cpf?: number;
    documento: String;
    fotoPath: string;
    telefones?: Telefone[];
    colaborador?: Colaborador;

    getKey(): string {
        return 'pessoa';
    }
}


export enum TipoPessoa {
    Colaborador = 1,
    Cliente = 2,
    Terceiro = 3
}
