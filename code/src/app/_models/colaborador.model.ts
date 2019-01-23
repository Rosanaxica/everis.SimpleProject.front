import { ModeloGenerico } from './modelo_generico';
import { Funcao } from './funcao.model';
import { PoloAcesso } from './poloAcesso.model';
import { AreaContratante } from './area_contratante.model';
import { TipoServico } from './tipo_servico.model';


export class Colaborador extends ModeloGenerico {

    funcaoId: number;
    funcao: Funcao;
    poloAcessoId: number;
    poloAcesso: PoloAcesso;
    areaContratanteId: number;
    areaContratante: AreaContratante;
    tipoServicoId: number;
    tipoServico: TipoServico;
    racf: string;
    emailCorporativo: string;
    dataNascimento: Date;
    dataAdmissao: Date;
    dataDemissao: Date;
    nomeMaquina: string;
    scf: boolean;
    clt: boolean;
    disponivel: boolean;
    senha: string;
    ocupacaoFisicaPoloAdm: boolean;
    contratoSAP: string;
    exclusivoCliente: boolean;
    tipoContratacao: string;
    gestorTecnicoCliente: string;

    constructor() {
        super();
        this.funcao = new Funcao();
        this.areaContratante = new AreaContratante();
        this.poloAcesso = new PoloAcesso();
        this.tipoServico = new TipoServico();
    }

    getKey(): string {
        return "Colaborador";
    }

}
