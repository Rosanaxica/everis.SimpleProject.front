export class Empresa {
    Id: number;
    Nome: string;
    Segmento: TipoSeguimento;
    Ativo: boolean;
}


export enum TipoSeguimento {
    Banking = 0,
    Telecomunicacao = 1
}
