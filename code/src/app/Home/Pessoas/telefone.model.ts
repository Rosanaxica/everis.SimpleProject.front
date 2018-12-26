
export class Telefone {
    IdTelefone: number;
    Telefone: string;
    Tipo: TipoTelefone;
}

export enum TipoTelefone {
    Residencial = 1,
    Particular = 2,
    Empresarial = 3
}
