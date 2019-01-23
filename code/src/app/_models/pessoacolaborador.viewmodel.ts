import { ModeloGenerico } from './modelo_generico';
import { Telefone } from './telefone.model';
import { TipoTelefone } from './tipo_telefone.model';
import { Pessoa } from './pessoa.model';
import { Diretoria } from './diretoria.model';
import { TipoPessoa } from './tipo_pessoa.model';
import { Funcao } from './funcao.model';
import { PoloAcesso } from './poloAcesso.model';
import { AreaContratante } from './area_contratante.model';
import { TipoServico } from './tipo_servico.model';
import { Sigla } from './sigla.model';
import { Ferramenta } from './ferramenta.model';
import { Colaborador } from './colaborador.model';


export class PessoaColaboradorViewModel extends ModeloGenerico {


    pessoa: Pessoa;
    tipoTelefone: TipoTelefone;
    telefones: Telefone[];
    siglasDisponiveis: Sigla[];
    siglasAssociadas: Sigla[];
    ferramentasDisponiveis: Ferramenta[];
    ferramentasAssociadas: Ferramenta[];

    
  colaboradorId: number;
  colaborador: Colaborador;

    constructor() {
        super();
        this.pessoa = new Pessoa();
        this.tipoTelefone = new TipoTelefone();
        this.colaborador =new Colaborador();
    }

    getKey() {
        return "Pessoa";
    }
}
