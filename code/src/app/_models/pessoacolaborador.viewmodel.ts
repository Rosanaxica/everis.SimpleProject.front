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


export class PessoaColaboradorViewModel extends ModeloGenerico {


    pessoa: Pessoa;
    diretoria: Diretoria;
    tipoTelefone: TipoTelefone;
    funcao: Funcao;
    poloAcesso: PoloAcesso;
    areaContratante: AreaContratante;
    tipoServico: TipoServico;
    telefones: Telefone[];
    siglasDisponiveis: Sigla[];
    siglasAssociadas: Sigla[];
    ferramentasDisponiveis: Ferramenta[];
    ferramentasAssociadas: Ferramenta[];

    constructor() {
        super();
        this.pessoa = new Pessoa();
        this.diretoria = new Diretoria();
        this.tipoTelefone = new TipoTelefone();
        this.funcao = new Funcao();
        this.poloAcesso = new PoloAcesso();
        this.areaContratante = new AreaContratante();
        this.tipoServico = new TipoServico();
    }

    getKey() {
        return null;
    }
}
