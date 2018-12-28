export class Empresa {
    IdEmpresa: number;
    Nome: string;
    Tipo: TipoSeguimento;
}


export enum TipoSeguimento {
    Banking = 0,
    Telecomunicacao = 1
}
