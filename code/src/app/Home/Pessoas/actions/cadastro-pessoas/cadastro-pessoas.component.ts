import { Component, OnInit, Input } from '@angular/core';
import { PessoaColaboradorViewModel } from 'src/app/_models/pessoacolaborador.viewmodel';
import { Telefone } from 'src/app/_models/telefone.model';
import { Empresa } from 'src/app/_models/empresa.model';
import { Colaborador } from 'src/app/_models/colaborador.model';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { GenericService } from 'src/app/_services/generic.service';
import { Ferramenta } from 'src/app/_models/ferramenta.model';
import { AcessoFerramenta } from 'src/app/_models/acessoFerramenta';
import { Sigla } from 'src/app/_models/sigla.model';
import { AcessoSigla } from 'src/app/_models/acessoSigla.model';
import { Funcao } from 'src/app/_models/funcao.model';
import { AreaContratante } from 'src/app/_models/area_contratante.model';
import { PoloAcesso } from 'src/app/_models/poloAcesso.model';
import { TipoServico } from 'src/app/_models/tipo_servico.model';
import { TipoTelefone } from 'src/app/_models/tipo_telefone.model';
import { Diretoria } from 'src/app/_models/diretoria.model';



@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {

  constructor(private route: ActivatedRoute, private svc: GenericService, private router: Router, private fb: FormBuilder) {
  }

  id: number;
  formularioPessoa: FormGroup;
  numberPattern = /^[0-9]*$/;

  pessoaColaborador = new PessoaColaboradorViewModel();
  gestores: Pessoa[] = [];

  tiposTelefone: TipoTelefone[] = [];
  telefone = new Telefone();
  telefones: Telefone[] = [];

  empresas: Empresa[] = [];
  funcoes: Funcao[] = [];
  areasContratantes: AreaContratante[] = [];
  polosAcesso: PoloAcesso[] = [];
  tipoServicos: TipoServico[] = [];
  diretorias: Diretoria[] = [];

  acessoSigla = new AcessoSigla();
  siglasDisponiveis: Sigla[] = []
  siglasAssociadas: Sigla[] = []
  btnRemoverSiglas: Sigla[] = [];
  btnAdicionarSiglas: Sigla[] = [];

  acessoFerramenta = new AcessoFerramenta();
  ferramentasDisponiveis: Ferramenta[] = [];
  ferramentasAssociadas: Ferramenta[] = [];
  btnRemoverFerramentas: Ferramenta[] = [];
  btnAdicionarFerramentas: Ferramenta[] = [];

  ngOnInit() {

    if (this.id != null && this.id !== undefined && this.id > 0) {
      this.pessoaColaborador.pessoa.id = this.id;
      //this.obterModelo();
      this.obterFerramentasDisponiveis();
    } else {
      this.obterFerramentas();
      this.obterSiglas()
      this.criarForm();
    }

    // executar a chamada abaixo no momento que finalizar o preenchimento do retorno da pessoa em edição
    // this.obterFerramentasAssociadas();

    this.svc.muitiGet([
      'Empresa/ObterTodos',
      'Funcao/ObterTodos',
      'AreaContratante/ObterTodos',
      'PoloAcesso/ObterTodos',
      'TipoServico/ObterTodos',
      'TipoTelefone/ObterTodos',
      'DiretoriaContratante/ObterTodos',
      'Pessoa/ObterGestoresTecnicos'
    ]).then(data => {
      this.empresas = data[0].json().data as Empresa[];
      this.funcoes = data[1].json().data as Funcao[];
      this.areasContratantes = data[2].json().data as AreaContratante[];
      this.polosAcesso = data[3].json().data as PoloAcesso[];
      this.tipoServicos = data[4].json().data as TipoServico[];
      this.tiposTelefone = data[5].json().data as TipoTelefone[];
      this.diretorias = data[6].json().data as TipoTelefone[];
      this.gestores = data[7].json().data as Pessoa[];
    });
  }

  criarForm(pessoaColaborador?: PessoaColaboradorViewModel) {
    pessoaColaborador = pessoaColaborador || new PessoaColaboradorViewModel();
    // pessoaColaborador.pessoa = new Pessoa();
    this.formularioPessoa = this.fb.group({
      'tipoPessoa': [pessoaColaborador.pessoa.tipoId, Validators.required],
      'nome': [pessoaColaborador.pessoa.nome, Validators.required],
      'diretoria': [pessoaColaborador.pessoa.diretoria, Validators.required],
      'funcional': [pessoaColaborador.pessoa.funcional, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]],
      'sexo': [pessoaColaborador.pessoa.sexo, Validators.required],
      'cpf': [pessoaColaborador.pessoa.cpf, [Validators.minLength(11), Validators.maxLength(11), Validators.pattern(this.numberPattern)]],
      'rg': [pessoaColaborador.pessoa.rg],
      'orgaoEmissor': [pessoaColaborador.pessoa.orgaoEmissor],
      'uf': [pessoaColaborador.pessoa.uFRg],
      'empresa': [pessoaColaborador.pessoa.empresaId],
      'gestorTecnico': [pessoaColaborador.pessoa.gestorTecnico],
      'documento': [pessoaColaborador.pessoa.documento],
      'tipoTelefone': [pessoaColaborador.tipoTelefone, Validators.required],
      'email': [pessoaColaborador.pessoa.email, [Validators.required, Validators.pattern("^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]],
      'emailCorp': [pessoaColaborador.pessoa.colaborador.emailCorporativo, Validators.required],
      'dataNascimento': [pessoaColaborador.pessoa.colaborador.dataNascimento, Validators.required],
      'dataAdmissao': [pessoaColaborador.pessoa.colaborador.dataAdmissao, Validators.required],
      'dataDemissao': [pessoaColaborador.pessoa.colaborador.dataDemissao, Validators.required],
      'funcao': [pessoaColaborador.pessoa.colaborador.funcaoId, Validators.required],
      'tipoServico': [pessoaColaborador.pessoa.colaborador.tipoServicoId, Validators.required],
      'poloAcesso': [pessoaColaborador.pessoa.colaborador.poloAcessoId, Validators.required],
      'areaContratante': [pessoaColaborador.pessoa.colaborador.areaContratanteId, Validators.required],
      'tipoContrato': [pessoaColaborador.pessoa.colaborador.tipoContratacao, Validators.required],
      'racf': [pessoaColaborador.pessoa.colaborador.racf],
      'nomeMaquina': [pessoaColaborador.pessoa.colaborador.nomeMaquina],
      'gestorResponsavel': [pessoaColaborador.pessoa.colaborador.gestorTecnicoCliente],
      'clt': [pessoaColaborador.pessoa.colaborador.clt],
      'scf': [pessoaColaborador.pessoa.colaborador.scf],
      'ocupacaoFisica': [pessoaColaborador.pessoa.colaborador.ocupacaoFisicaPoloAdm],
      'exclusivoCliente': [pessoaColaborador.pessoa.colaborador.exclusivoCliente],
      'sigDisponiveis': [pessoaColaborador.siglasDisponiveis],
      'sigAssociadas': [pessoaColaborador.siglasAssociadas],
      'ferrDisponiveis': [pessoaColaborador.ferramentasDisponiveis],
      'ferrAssociadas': [pessoaColaborador.ferramentasAssociadas]
    });
  }



  getTipoPessoa(id: number) {
    this.pessoaColaborador.pessoa.tipoId = id;
  }

  AddTelefone() {
    const formObj = this.formularioPessoa.value;
    var dadosTipo = formObj.tipoTelefone.toString().split('-');
    this.telefone.tipoTelefone = new TipoTelefone();
    this.telefone.tipoTelefone.id = dadosTipo[0];
    this.telefone.tipoTelefone.descricao = dadosTipo[1];
    this.telefone.tipoId = dadosTipo[0]
    this.telefone.numeroTelefone = formObj.numeroTelefone;
    this.telefones.push(this.telefone);
    this.telefone = new Telefone();
    // this.tipoTelefone = new TipoTelefone();
  }

  onKeydown() {
    this.telefones.push(this.telefone);
    // this.telefone = new Telefone();
  }

  isTelRequired(): boolean {
    if (this.telefones.length === 0) {
      return true;
    }
    return false;
  }


  adicionarFerramenta() {
    this.btnAdicionarFerramentas = this.formularioPessoa.controls['ferrDisponiveis'].value;
    if (this.btnAdicionarFerramentas.length == 0) {
      alert('Selecione uma ferramenta para adicionar');
      return;
    } else {
      this.btnAdicionarFerramentas.forEach(a => {
        let item = this.ferramentasDisponiveis.find(f => f.id == +a);
        let itemIndex = this.ferramentasDisponiveis.indexOf(item);
        this.ferramentasAssociadas.push(item);
        this.ferramentasDisponiveis.splice(itemIndex, 1);
      });
      this.btnAdicionarFerramentas = [];
    }
  }

  removerFerramenta() {
    this.btnRemoverFerramentas = this.formularioPessoa.controls['ferrAssociadas'].value;
    if (this.btnRemoverFerramentas.length == 0) {
      alert('Selecione uma ferramenta para remover');
      return;
    } else {
      this.btnRemoverFerramentas.forEach(a => {
        let item = this.ferramentasAssociadas.find(f => f.id == +a);
        let itemIndex = this.ferramentasAssociadas.indexOf(item);
        this.ferramentasDisponiveis.push(item);
        this.ferramentasAssociadas.splice(itemIndex, 1);
      });
      this.btnRemoverFerramentas = [];
    }
  }

  obterFerramentasDisponiveis() {

  }

  obterFerramentasAssociadas() {

  }

  obterFerramentas() {
    this.svc.listar(Ferramenta, null, "ObterTodos").toPromise().then(
      data => {
        if (data.sucesso) {
          if (data.data != null && data.data !== undefined) {
            this.ferramentasDisponiveis = data.data;
          }
        }
      }
    );
  }


  atribuirAcessoFerramenta() {

    let lstAcesso: AcessoFerramenta[] = [];
    this.ferramentasAssociadas.forEach(element => {
      this.acessoFerramenta.ferramentaId = element.id;
      lstAcesso.push(this.acessoFerramenta);
      this.acessoFerramenta = new AcessoFerramenta();
    });

    // this.pessoaColaborador.colaborador.acessos = lstAcesso;

  }

  obterSiglas() {
    this.svc.listar(Sigla, null, "ObterTodos").toPromise().then(
      data => {
        if (data.sucesso) {
          if (data.data != null && data.data !== undefined) {
            this.siglasDisponiveis = data.data;
          }
        }
      }
    );
  }

  adicionarSigla() {
    this.btnAdicionarSiglas = this.formularioPessoa.controls['sigDisponiveis'].value;
    if (this.btnAdicionarSiglas.length == 0) {
      alert('Selecione uma ferramenta para adicionar');
      return;
    } else {
      this.btnAdicionarSiglas.forEach(a => {
        let item = this.siglasDisponiveis.find(f => f.id == +a);
        let itemIndex = this.siglasDisponiveis.indexOf(item);
        this.siglasAssociadas.push(item);
        this.siglasDisponiveis.splice(itemIndex, 1);
      });
      this.btnAdicionarSiglas = [];
    }
  }

  removerSigla() {
    this.btnRemoverSiglas = this.formularioPessoa.controls['sigAssociadas'].value;
    if (this.btnRemoverSiglas.length == 0) {
      alert('Selecione uma ferramenta para remover');
      return;
    } else {
      this.btnRemoverSiglas.forEach(a => {
        let item = this.siglasAssociadas.find(f => f.id == +a);
        let itemIndex = this.siglasAssociadas.indexOf(item);
        this.siglasDisponiveis.push(item);
        this.siglasAssociadas.splice(itemIndex, 1);
      });
      this.btnRemoverSiglas = [];
    }
  }

  atribuirAcessoSigla() {

    let lstAcesso: AcessoSigla[] = [];
    this.siglasAssociadas.forEach(element => {
      this.acessoSigla.id = element.id;
      lstAcesso.push(this.acessoSigla);
      this.acessoSigla = new AcessoSigla();
    });
    // this.pessoaColaborador.colaborador.siglas = lstAcesso;
  }


}
