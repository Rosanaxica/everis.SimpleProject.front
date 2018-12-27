import { Empresa } from '../Empresa/empresa.model';
import { Telefone } from './telefone.model';


export class Pessoa {
    Nome: string;
    Tipo: TipoPessoa;
    Email: string;
    Documento: String;
    Cpf: string;
    FotoPath: string;
    IdEmpresa: number;
    Empresa?: Empresa;
    Telefones?: Telefone[];
}

export enum TipoPessoa {
    Colaborador = 1,
    Cliente = 2,
    Terceiro = 3
}
