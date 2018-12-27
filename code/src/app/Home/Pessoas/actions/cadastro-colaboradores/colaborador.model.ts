import { Pessoa } from '../../pessoa.model';

export class Colaborador extends Pessoa {
    IdColaborador: number;
    Racf: string;
    EmailCorp: string;
    Funcional: number;
    NomeMaquina: string;
    Funcao: FuncaoColaborador;
    Perfil: PerfilColaborador;
    Disponivel: boolean;
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
