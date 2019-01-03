
export class Telefone {
    Id: number;
    NumeroTelefone: string;
    TipoTelefone: TipoTelefone;
}

export enum TipoTelefone {
    Residencial = 1,
    Particular = 2,
    Empresarial = 3
}
