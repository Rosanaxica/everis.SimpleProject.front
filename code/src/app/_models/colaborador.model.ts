import { FuncaoColaborador, PerfilColaborador } from './pessoacolaborador.viewmodel';
import { ModeloGenerico } from './modelo_generico';


export class Colaborador extends ModeloGenerico {
    racf: string;
    emailCorporativo: string;
    funcional: number;
    nomeMaquina: string;
    funcao: FuncaoColaborador;
    perfil: PerfilColaborador;
    disponivel: boolean;
    senha: string;

    getKey(): string {
        return 'colaborador';
    }

}
