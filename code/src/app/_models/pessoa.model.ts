import { Empresa } from './empresa.model';
import { Telefone } from './telefone.model';


export class Pessoa {
    IdPessoa: number;
    Ativo: boolean;
    Nome: string;
    Tipo: TipoPessoa;
    Email: string;
    Cpf?: number;
    Documento: String;
    FotoPath: string;
    IdEmpresa: number;
    Telefones?: Telefone[];

    constructor() {
        this.Ativo = true;
    }
}


export enum TipoPessoa {
    Colaborador = 1,
    Cliente = 2,
    Terceiro = 3
}
