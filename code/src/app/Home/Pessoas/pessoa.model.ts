import { Empresa } from '../Empresa/empresa.model';
import { Telefone } from './telefone.model';


export class Pessoa {
    Ativo: boolean;
    Nome: string;
    Tipo: TipoPessoa;
    Email: string;
    Cpf?: number;
    Documento: String;
    FotoPath: string;
    IdEmpresa: number;
    Empresa?: Empresa;
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
