import { Colaborador } from './colaborador.model';
import { Empresa } from './empresa.model';
import { ModeloGenerico } from './modelo_generico';
import { Diretoria } from './diretoria.model';
import { TipoPessoa } from './tipo_pessoa.model';


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

    constructor() {
        super();
        this.colaborador = new Colaborador();
    }

    getKey(): string {
        return 'pessoa';
    }
}