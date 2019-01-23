import { Component, OnInit, Input } from '@angular/core';
import { PessoaColaboradorViewModel } from 'src/app/_models/pessoacolaborador.viewmodel';
import { Telefone } from 'src/app/_models/telefone.model';
import { Empresa } from 'src/app/_models/empresa.model';
import { Colaborador } from 'src/app/_models/colaborador.model';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
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

  constructor(private arouter: ActivatedRoute, private svc: GenericService, private router: Router, private fb: FormBuilder) {
  }

  id: number;
  formularioPessoa: FormGroup;
  numberPattern = /^[0-9]*$/;

  pessoaColaborador = new PessoaColaboradorViewModel();
  gestores: Pessoa[] = [];

  tiposTelefone: TipoTelefone[] = [{ id: 0, descricao: 'Selecione' } as TipoTelefone];
  telefone = new Telefone();
  filtroTelefone = new Telefone();
  filtroPessoa = new Pessoa();
  telefones: Telefone[] = [];

  empresas: Empresa[] = [{ id: 0, nome: 'Selecione' } as Empresa];
  funcoes: Funcao[] = [];
  areasContratantes: AreaContratante[] = [];
  polosAcesso: PoloAcesso[] = [];
  tipoServicos: TipoServico[] = [{ id: 0, descricao: 'Selecione' } as TipoServico];
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
    this.criarForm();
    this.arouter.paramMap.subscribe(res => {
      this.id = +res.get('id');
      if (this.id != null && this.id !== undefined && this.id > 0) {
        this.pessoaColaborador.pessoa.id = this.id;
        this.filtroTelefone.pessoaId = this.id;
        this.filtroPessoa.id = this.id;
        this.obterModelo();
      } else {
        this.obterFerramentas();
        this.obterSiglas()
        this.criarForm();
      }
    });

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
      this.empresas.unshift({ id: 0, nome: 'Selecione' } as Empresa);
      this.funcoes = data[1].json().data as Funcao[];
      this.areasContratantes = data[2].json().data as AreaContratante[];
      this.polosAcesso = data[3].json().data as PoloAcesso[];
      this.tipoServicos = data[4].json().data as TipoServico[];
      this.tipoServicos.unshift({ id: 0, descricao: 'Selecione' } as TipoServico);
      this.tiposTelefone = data[5].json().data as TipoTelefone[];
      this.tiposTelefone.unshift({ id: 0, descricao: 'Selecione' } as TipoTelefone);
      this.diretorias = data[6].json().data as TipoTelefone[];
      this.gestores = data[7].json().data as Pessoa[];
    });

    this.formularioPessoa.get('tipoPessoa').valueChanges.subscribe(
      (data: string) => {
        this.preferenciaTipoPessoa(data);
      }
    )
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

  RemoverTelefone(telefone: Telefone) {
    this.telefones.splice(this.telefones.indexOf(telefone, 1));
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
  }

  obterModelo() {

    let pessoaColaborador = new PessoaColaboradorViewModel();

    this.svc.obter(this.filtroPessoa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            let pessoa = s.data as Pessoa;
            pessoaColaborador.pessoa = pessoa;

            this.svc.listar(Colaborador, null, `ListarFerramentasDisponiveis/${pessoaColaborador.pessoa.colaboradorId}`).toPromise().then(
              s => {
                if (s.sucesso) {
                  if (s.data != null && s.data !== undefined) {
                    let ferramentasDisponiveis = s.data as Ferramenta[];
                    pessoaColaborador.ferramentasDisponiveis = new Array<Ferramenta>();
                    pessoaColaborador.ferramentasDisponiveis = ferramentasDisponiveis;
                    this.ferramentasDisponiveis = ferramentasDisponiveis;
                  }
                }
              }
            );

            this.svc.listar(Colaborador, null, `ListarFerramentasAssociadas/${pessoaColaborador.pessoa.colaboradorId}`).toPromise().then(
              s => {
                if (s.sucesso) {
                  if (s.data != null && s.data !== undefined) {
                    let ferramentasAssociadas = s.data as Ferramenta[];
                    pessoaColaborador.ferramentasAssociadas = ferramentasAssociadas;
                    this.ferramentasAssociadas = ferramentasAssociadas;
                  }
                }
              }
            );


            this.svc.listar(Colaborador, null, `ListarSiglasDisponiveis/${pessoaColaborador.pessoa.colaboradorId}`).toPromise().then(
              s => {
                if (s.sucesso) {
                  if (s.data != null && s.data !== undefined) {
                    let siglasDisponiveis = s.data as Sigla[];
                    pessoaColaborador.siglasDisponiveis = siglasDisponiveis;
                    this.siglasDisponiveis = siglasDisponiveis;
                  }
                }
              }
            );

            this.svc.listar(Colaborador, null, `ListarSiglasAssociadas/${pessoaColaborador.pessoa.colaboradorId}`).toPromise().then(
              s => {
                if (s.sucesso) {
                  if (s.data != null && s.data !== undefined) {
                    let siglasAssociadas = s.data as Sigla[];
                    pessoaColaborador.siglasAssociadas = siglasAssociadas;
                    this.siglasAssociadas = siglasAssociadas;
                  }
                }
              }
            );

            this.svc.listar(Telefone, this.filtroTelefone).toPromise().then(
              s => {
                if (s.sucesso) {
                  if (s.data != null && s.data !== undefined) {
                    this.telefones = s.data as Telefone[];
                    // pessoaColaborador.telefones = telefones;
                    // this.telefones = telefones;
                    // debugger;
                  }
                }
              }
            );
            this.criarForm(pessoaColaborador);
          }
        }
      }

    );








  }

  criarForm(pessoaColaborador?: PessoaColaboradorViewModel) {
    pessoaColaborador = pessoaColaborador || new PessoaColaboradorViewModel();

    let tipo = '1';

    if (pessoaColaborador.pessoa.id > 0) {
      tipo = String(pessoaColaborador.pessoa.tipoId);
    }
    // pessoaColaborador.pessoa = new Pessoa();
    this.formularioPessoa = this.fb.group({
      'tipoPessoa': [tipo],
      'nome': [pessoaColaborador.pessoa.nome, Validators.required],
      'diretoria': [pessoaColaborador.pessoa.diretoriaId, Validators.required],
      'funcional': [pessoaColaborador.pessoa.funcional, Validators.required],
      'sexo': [pessoaColaborador.pessoa.sexo, Validators.required],
      'cpf': [pessoaColaborador.pessoa.cpf],
      'rg': [pessoaColaborador.pessoa.rg],
      'orgaoEmissor': [pessoaColaborador.pessoa.orgaoEmissor],
      'uf': [pessoaColaborador.pessoa.uFRg],
      'empresa': [pessoaColaborador.pessoa.empresaId],
      'gestorTecnico': [pessoaColaborador.pessoa.gestorTecnico],
      'documento': [pessoaColaborador.pessoa.documento],
      'tipoTelefone': [pessoaColaborador.tipoTelefone, Validators.required],
      'email': [pessoaColaborador.pessoa.email, Validators.required],
      'emailCorp': [pessoaColaborador.pessoa.colaborador.emailCorporativo],
      'dataNascimento': [pessoaColaborador.pessoa.colaborador.dataNascimento],
      'dataAdmissao': [pessoaColaborador.pessoa.colaborador.dataAdmissao],
      'dataDemissao': [pessoaColaborador.pessoa.colaborador.dataDemissao],
      'funcao': [pessoaColaborador.pessoa.colaborador.funcaoId],
      'tipoServico': [pessoaColaborador.pessoa.colaborador.tipoServicoId],
      'poloAcesso': [pessoaColaborador.pessoa.colaborador.poloAcessoId],
      'areaContratante': [pessoaColaborador.pessoa.colaborador.areaContratanteId],
      'tipoContrato': [pessoaColaborador.pessoa.colaborador.tipoContratacao],
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
      'ferrAssociadas': [pessoaColaborador.ferramentasAssociadas],
      'numeroTelefone': [this.telefone.numeroTelefone, [Validators.minLength(10), Validators.maxLength(15), Validators.pattern("[0-9]{10,15}")]]
    });
  }

  private obterDadosForm() {
    console.log("Dados antes de obter form: " + JSON.stringify(this.pessoaColaborador));
    let formObj = this.formularioPessoa.value;

    this.pessoaColaborador.pessoa.tipoId = +formObj.tipoPessoa;
    this.pessoaColaborador.pessoa.nome = formObj.nome;
    this.pessoaColaborador.pessoa.diretoriaId = +formObj.diretoria;
    this.pessoaColaborador.pessoa.funcional = +formObj.funcional;
    this.pessoaColaborador.pessoa.sexo = formObj.sexo;
    this.pessoaColaborador.pessoa.cpf = +formObj.cpf;
    this.pessoaColaborador.pessoa.documento = formObj.documento;
    this.pessoaColaborador.pessoa.rg = formObj.rg;
    this.pessoaColaborador.pessoa.orgaoEmissor = formObj.orgaoEmissor;
    this.pessoaColaborador.pessoa.uFRg = formObj.uf;
    this.pessoaColaborador.telefones = this.telefones;
    this.pessoaColaborador.pessoa.email = formObj.email;

    if (formObj.tipoPessoa == 1) {

      this.pessoaColaborador.pessoa.colaborador.emailCorporativo = formObj.emailCorp;
      this.pessoaColaborador.pessoa.colaborador.racf = formObj.racf;
      this.pessoaColaborador.pessoa.colaborador.nomeMaquina = formObj.nomeMaquina;
      this.pessoaColaborador.pessoa.colaborador.tipoContratacao = formObj.tipoContrato;
      this.pessoaColaborador.pessoa.colaborador.dataNascimento = formObj.dataNascimento;
      this.pessoaColaborador.pessoa.colaborador.dataAdmissao = formObj.dataAdmissao;
      this.pessoaColaborador.pessoa.colaborador.dataDemissao = formObj.dataDemissao;
      this.pessoaColaborador.pessoa.colaborador.funcaoId = +formObj.funcao;
      this.pessoaColaborador.pessoa.colaborador.tipoServicoId = +formObj.tipoServico;
      this.pessoaColaborador.pessoa.colaborador.poloAcessoId = +formObj.poloAcesso;
      this.pessoaColaborador.pessoa.colaborador.areaContratanteId = formObj.areaContratante;
      this.pessoaColaborador.pessoa.colaborador.gestorTecnicoCliente = formObj.gestorResponsavel;
      this.pessoaColaborador.pessoa.colaborador.clt = formObj.clt;
      this.pessoaColaborador.pessoa.colaborador.scf = formObj.scf;
      this.pessoaColaborador.pessoa.colaborador.ocupacaoFisicaPoloAdm = formObj.ocupacaoFisica;
      this.pessoaColaborador.pessoa.colaborador.exclusivoCliente = formObj.exclusivoCliente;
      this.pessoaColaborador.ferramentasAssociadas = this.ferramentasAssociadas;
      this.pessoaColaborador.siglasAssociadas = this.siglasAssociadas;
      this.pessoaColaborador.pessoa.empresa = null;
    } else {
      this.pessoaColaborador.pessoa.empresaId = +formObj.empresa;
      this.pessoaColaborador.pessoa.gestorTecnico = formObj.gestorTecnico;
    }

    this.pessoaColaborador.pessoa.colaborador.poloAcesso = null;
    this.pessoaColaborador.pessoa.colaborador.tipoServico = null;
    this.pessoaColaborador.pessoa.colaborador.areaContratante = null;
    this.pessoaColaborador.pessoa.colaborador.funcao = null;
    this.pessoaColaborador.pessoa.diretoria = null;
    this.pessoaColaborador.pessoa.tipo = null;
    console.log("Dados obtidos do form: " + JSON.stringify(this.pessoaColaborador))

  }


  preferenciaTipoPessoa(valorSelecionado: string) {
    const emailCorpControl = this.formularioPessoa.get('emailCorp');
    const tipoContratoControl = this.formularioPessoa.get('tipoContrato');
    const dataNascimentoControl = this.formularioPessoa.get('dataNascimento');
    const dataAdmissaoControl = this.formularioPessoa.get('dataAdmissao');
    const funcaoControl = this.formularioPessoa.get('funcao');
    const tipoServicoControl = this.formularioPessoa.get('tipoServico');
    const poloAcessoControl = this.formularioPessoa.get('poloAcesso');
    const areaContratanteControl = this.formularioPessoa.get('areaContratante');
    const gestorResponsavelControl = this.formularioPessoa.get('gestorResponsavel');
    const empresaControl = this.formularioPessoa.get('empresa');

    if (valorSelecionado === '1') {
      tipoContratoControl.setValidators(Validators.required);
      dataNascimentoControl.setValidators(Validators.required);
      dataAdmissaoControl.setValidators(Validators.required);
      funcaoControl.setValidators(Validators.required);
      tipoServicoControl.setValidators(Validators.required);
      poloAcessoControl.setValidators(Validators.required);
      areaContratanteControl.setValidators(Validators.required);
      gestorResponsavelControl.setValidators(Validators.required);

      empresaControl.clearValidators();

    } else {

      emailCorpControl.clearValidators();
      tipoContratoControl.clearValidators();
      dataNascimentoControl.clearValidators();
      dataAdmissaoControl.clearValidators();
      funcaoControl.clearValidators();
      tipoServicoControl.clearValidators();
      poloAcessoControl.clearValidators();
      areaContratanteControl.clearValidators();
      gestorResponsavelControl.clearValidators();
    }
    tipoContratoControl.updateValueAndValidity();
    dataNascimentoControl.updateValueAndValidity();
    dataAdmissaoControl.updateValueAndValidity();
    funcaoControl.updateValueAndValidity();
    tipoServicoControl.updateValueAndValidity();
    poloAcessoControl.updateValueAndValidity();
    areaContratanteControl.updateValueAndValidity();
    gestorResponsavelControl.updateValueAndValidity();
    empresaControl.updateValueAndValidity();
  }

  Salvar() {
    this.obterDadosForm();

    if (this.pessoaColaborador.pessoa.id == undefined && this.pessoaColaborador.pessoa.colaborador.id == undefined) {
      this.atribuirAcessoFerramenta();
      this.atribuirAcessoSigla();
    }

    if (this.pessoaColaborador.pessoa.tipoId == 3) {
      this.pessoaColaborador.pessoa.colaborador = null
    }

    if (this.pessoaColaborador.pessoa.id > 0) {
      this.svc.salvar(this.pessoaColaborador.pessoa)
        .toPromise().then(
          data => {
            this.router.navigate([`pessoas`]);
            // this.msgSucesso = 'Colaborador cadastrado com sucesso!';
          },
          error => {
            alert(error.data);
          }
        );
    } else {
      this.svc.postViewModel(this.pessoaColaborador, 'pessoa/CriarPessoaColaborador')
        .toPromise().then(
          data => {
            this.router.navigate([`pessoas`]);
            // this.msgSucesso = 'Colaborador cadastrado com sucesso!';
          },
          error => {
            alert(error.data);
          }
        );

    }

    this.formularioPessoa.reset();
    this.telefones = [];
    this.ferramentasAssociadas = [];
    this.ferramentasDisponiveis = [];
  }






}


