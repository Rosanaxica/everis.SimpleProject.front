import { Empresa } from '../Empresa/empresa.model';


export class Pessoa {
    Nome: string;
    Tipo: TipoPessoa;
    Email: string;
    Documento: String;
    Cpf: number;
    FotoPath: string;
    IdEmpresa: number;
    Empresa: Empresa;
}

export enum TipoPessoa {
    Colaborador = 1,
    Cliente = 2,
    Terceiro = 3
}
