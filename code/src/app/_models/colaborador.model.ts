import { Pessoa } from './pessoa.model';
import { FuncaoColaborador, PerfilColaborador } from './pessoacolaborador.viewmodel';

export class Colaborador {

    Id: number;
    Racf: string;
    EmailCorporativo: string;
    Funcional: number;
    NomeMaquina: string;
    Funcao: FuncaoColaborador;
    Perfil: PerfilColaborador;
    Disponivel: boolean;
    Senha: string;

    constructor() {
        this.Disponivel = true;
    }
}
