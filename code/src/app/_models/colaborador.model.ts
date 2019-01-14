import { FuncaoColaborador, PerfilColaborador } from './pessoacolaborador.viewmodel';
import { ModeloGenerico } from './modelo_generico';


export class Colaborador extends ModeloGenerico {
    racf: string;
    emailcorporativo: string;
    funcional: number;
    nomemaquina: string;
    funcao: FuncaoColaborador;
    perfil: PerfilColaborador;
    disponivel: boolean;
    senha: string;

    getKey(): string {
        return 'colaborador';
    }

}
