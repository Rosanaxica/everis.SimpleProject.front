import { FuncaoColaborador, PerfilColaborador } from './pessoacolaborador.viewmodel';
import { ModeloGenerico } from './modelo_generico';
import { AcessoFerramenta } from './acessoFerramenta';
import { Sigla } from './sigla.model';
import { AcessoSigla } from './acessoSigla.model';


export class Colaborador extends ModeloGenerico {
    racf: string;
    emailcorporativo: string;
    funcional: number;
    nomemaquina: string;
    funcao: FuncaoColaborador;
    perfil: PerfilColaborador;
    disponivel: boolean;
    senha: string;
    acessos: AcessoFerramenta[];
    siglas: AcessoSigla[];

    getKey(): string {
        return 'colaborador';
    }

}
