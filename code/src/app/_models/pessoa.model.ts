import { Colaborador } from './colaborador.model';
import { Empresa } from './empresa.model';
import { Telefone } from './telefone.model';


export class Pessoa {
    Id: number;
    EmpresaId: number;
    Ativo: boolean;
    Nome: string;
    Tipo: TipoPessoa;
    Email: string;
    Cpf?: number;
    Documento: String;
    FotoPath: string;
    Telefones?: Telefone[];
    Colaborador?: Colaborador;

    constructor() {
        this.Ativo = true;
    }
}


export enum TipoPessoa {
    Colaborador = 1,
    Cliente = 2,
    Terceiro = 3
}
