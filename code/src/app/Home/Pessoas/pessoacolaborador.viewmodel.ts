import { Empresa } from '../Empresa/empresa.model';
import { Telefone } from './telefone.model';

export class PessoaColaboradorViewModel {
    IdColaborador: number;
    IdEmpresa: number;
    IdPessoa: number;
    Ativo: boolean;
    Nome: string;
    Tipo: TipoPessoa;
    Email: string;
    Cpf?: number;
    Documento?: String;
    FotoPath: string;
    Empresa?: Empresa;
    Telefones: Telefone[];
    Racf: string;
    EmailCorp: string;
    Funcional: number;
    NomeMaquina: string;
    Funcao: FuncaoColaborador;
    Perfil: PerfilColaborador;
    Disponivel: boolean;

    constructor() {
        this.Ativo = true;
        this.Disponivel = true;
    }
}

export enum TipoPessoa {
    Colaborador = 1,
    Cliente = 2,
    Terceiro = 3
}
export enum FuncaoColaborador {
    SA = 1,
    SN = 2,
    STL = 3,
    SPL = 4,
    SK = 5,
    SKL = 6,
    Manager = 7
}

export enum PerfilColaborador {
    Master = 1,
    Lider = 2,
    Colaborador = 3
}
