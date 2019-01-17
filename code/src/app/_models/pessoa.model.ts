import { Colaborador } from './colaborador.model';
import { Empresa } from './empresa.model';
import { Telefone } from './telefone.model';
import { ModeloGenerico } from './modelo_generico';
import { Diretoria } from './diretoria.model';


export class Pessoa extends ModeloGenerico {

    diretoriaId: number;
    diretoria: Diretoria;
    colaboradorId: number;
    colaborador: Colaborador;
    empresaId: number;
    empresa: Empresa;
    tipoId: number;
    tipo: TipoPessoa;
    nome: string;
    email: string;
    sexo: string;
    documento: string;
    cpf?: number;
    rg?: string;
    orgaoEmissor?: string;
    uFRg?: string;
    fotoPath: string;
    funcional: number;
    gestorTecnico: boolean;

    getKey(): string {
        return 'pessoa';
    }
}


export enum TipoPessoa {
    Colaborador = 1,
    Cliente = 2,
    Terceiro = 3
}
