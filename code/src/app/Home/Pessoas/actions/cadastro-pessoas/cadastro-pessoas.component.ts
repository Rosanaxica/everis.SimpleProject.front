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
import { DateFormatPipe } from 'src/app/shared/util/date-format-pipe';



@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {

  constructor(private arouter: ActivatedRoute, private svc: GenericService, private router: Router, private fb: FormBuilder, private formateDate: DateFormatPipe) {
  }

  colaboradorId: number;
  id: number;
  formularioPessoa: FormGroup;
  numberPattern = /^[0-9]*$/;

  pessoaColaborador = new PessoaColaboradorViewModel();
  gestores: Pessoa[] = [];

  tiposTelefone: TipoTelefone[] = [];
  telefone = new Telefone();
  filtroTelefone = new Telefone();
  filtroPessoa = new Pessoa();
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

  getTipoPessoa(id: number) {
    this.pessoaColaborador.pessoa.tipoId = id;
  }

  AddTelefone() {
    const formObj = this.formularioPessoa.value;
    var dadosTipo = formObj.tipoTelefone.toString().split('-');
    this.telefone.tipo = new TipoTelefone();
    this.telefone.tipo.id = dadosTipo[0];
    this.telefone.tipo.descricao = dadosTipo[1];
    this.telefone.tipoId = dadosTipo[0]
    this.telefone.numeroTelefone = formObj.numeroTelefone;
    this.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  RemoverTelefone(telefone: Telefone) {
    this.telefones.splice(this.telefones.indexOf(telefone), 1)
  }

  onKeydown() {
    this.telefones.push(this.telefone);
  }

  isTelRequired(): boolean {
    if (this.telefones.length === 0) {
      return true;
    }
    return false;
  }


  // adicionarFerramenta() {
  //   this.btnAdicionarFerramentas = this.formularioPessoa.controls['ferrDisponiveis'].value;
  //   if (this.btnAdicionarFerramentas.length == 0) {
  //     alert('Selecione uma ferramenta para adicionar');
  //     return;
  //   } else {
  //     this.btnAdicionarFerramentas.forEach(a => {
  //       let item = this.ferramentasDisponiveis.find(f => f.id == +a);
  //       let itemIndex = this.ferramentasDisponiveis.indexOf(item);
  //       this.ferramentasAssociadas.push(item);
  //       this.ferramentasDisponiveis.splice(itemIndex, 1);
  //     });
  //     this.btnAdicionarFerramentas = [];
  //   }
  // }

  // removerFerramenta() {
  //   this.btnRemoverFerramentas = this.formularioPessoa.controls['ferrAssociadas'].value;
  //   if (this.btnRemoverFerramentas.length == 0) {
  //     alert('Selecione uma ferramenta para remover');
  //     return;
  //   } else {
  //     this.btnRemoverFerramentas.forEach(a => {
  //       let item = this.ferramentasAssociadas.find(f => f.id == +a);
  //       let itemIndex = this.ferramentasAssociadas.indexOf(item);
  //       this.ferramentasDisponiveis.push(item);
  //       this.ferramentasAssociadas.splice(itemIndex, 1);
  //     });
  //     this.btnRemoverFerramentas = [];
  //   }
  // }


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

    this.svc.obter(this.filtroPessoa, `ObterPessoaColaborador/${this.filtroPessoa.id}`).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            pessoaColaborador = s.data as PessoaColaboradorViewModel;
            this.telefones = pessoaColaborador.telefones || new Array<Telefone>();
            this.ferramentasAssociadas = pessoaColaborador.ferramentasAssociadas || new Array<Ferramenta>();
            this.siglasAssociadas = pessoaColaborador.siglasAssociadas || new Array<Sigla>();

            if (pessoaColaborador.colaborador != null && pessoaColaborador != undefined) {
              pessoaColaborador.colaboradorId = pessoaColaborador.colaborador.id;
              this.colaboradorId = pessoaColaborador.colaborador.id;
            } else {
              pessoaColaborador.colaboradorId = 0;
            }
            this.svc.listar(Colaborador, null, `ListarFerramentasDisponiveis/${pessoaColaborador.colaboradorId}`).toPromise().then(
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

            this.svc.listar(Colaborador, null, `ListarSiglasDisponiveis/${pessoaColaborador.colaboradorId}`).toPromise().then(
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
            this.criarForm(pessoaColaborador);
          }
        }
      }
    );
  }

  criarForm(pessoaColaborador?: PessoaColaboradorViewModel) {
    pessoaColaborador = pessoaColaborador || new PessoaColaboradorViewModel();
    pessoaColaborador.colaborador = pessoaColaborador.colaborador || new Colaborador();
    let tipo = '1';

    if (pessoaColaborador.pessoa.id > 0) {
      tipo = String(pessoaColaborador.pessoa.tipoId);
    }
    // pessoaColaborador.pessoa = new Pessoa();
    this.formularioPessoa = this.fb.group({
      'tipoPessoa': [tipo],
      'nome': [pessoaColaborador.pessoa.nome, Validators.required],
      'diretoria': [pessoaColaborador.pessoa.diretoriaId, Validators.required],
      'funcional': [pessoaColaborador.pessoa.funcional, [Validators.required, Validators.pattern(this.numberPattern)]],
      'sexo': [pessoaColaborador.pessoa.sexo, Validators.required],
      'cpf': [pessoaColaborador.pessoa.cpf != null && pessoaColaborador.pessoa.cpf != undefined && pessoaColaborador.pessoa.cpf > 0 ? pessoaColaborador.pessoa.cpf : undefined, [Validators.pattern(this.numberPattern)]],
      'rg': [pessoaColaborador.pessoa.rg != null && pessoaColaborador.pessoa.rg != undefined && pessoaColaborador.pessoa.rg != '' ? pessoaColaborador.pessoa.rg : undefined, [Validators.minLength(9), Validators.maxLength(9)]],
      'orgaoEmissor': [pessoaColaborador.pessoa.orgaoEmissor, [Validators.maxLength(5)]],
      'uf': [pessoaColaborador.pessoa.ufRg],
      'empresa': [pessoaColaborador.pessoa.empresaId],
      'gestorTecnico': [pessoaColaborador.pessoa.gestorTecnico],
      'documento': [pessoaColaborador.pessoa.documento],
      'tipoTelefone': [pessoaColaborador.tipoTelefone],
      'email': [pessoaColaborador.pessoa.email, Validators.required],
      'emailCorp': [pessoaColaborador.colaborador.emailCorporativo],
      'dataNascimento': [this.formateDate.transform(pessoaColaborador.colaborador.dataNascimento)],
      'dataAdmissao': [this.formateDate.transform(pessoaColaborador.colaborador.dataAdmissao)],
      'dataDemissao': [this.formateDate.transform(pessoaColaborador.colaborador.dataDemissao)],
      'funcao': [pessoaColaborador.colaborador.funcaoId],
      'tipoServico': [pessoaColaborador.colaborador.tipoServicoId],
      'poloAcesso': [pessoaColaborador.colaborador.poloAcessoId],
      'areaContratante': [pessoaColaborador.colaborador.areaContratanteId],
      'tipoContrato': [pessoaColaborador.colaborador.tipoContratacao],
      'racf': [pessoaColaborador.colaborador.racf],
      'nomeMaquina': [pessoaColaborador.colaborador.nomeMaquina],
      'gestorResponsavel': [pessoaColaborador.colaborador.gestorTecnicoCliente],
      'clt': [pessoaColaborador.colaborador.clt],
      'scf': [pessoaColaborador.colaborador.scf],
      'ocupacaoFisica': [pessoaColaborador.colaborador.ocupacaoFisicaPoloAdm],
      'exclusivoCliente': [pessoaColaborador.colaborador.exclusivoCliente],
      'sigDisponiveis': [pessoaColaborador.siglasDisponiveis],
      'sigAssociadas': [pessoaColaborador.siglasAssociadas],
      'ferrDisponiveis': [pessoaColaborador.ferramentasDisponiveis],
      'ferrAssociadas': [pessoaColaborador.ferramentasAssociadas],
      'numeroTelefone': [this.telefone.numeroTelefone, [Validators.minLength(10), Validators.maxLength(15), Validators.pattern("[0-9]{10,15}")]]
    });

    this.preferenciaTipoPessoa();
  }

  private obterDadosForm() {
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
    this.pessoaColaborador.pessoa.ufRg = formObj.uf;
    this.pessoaColaborador.telefones = this.telefones;
    this.pessoaColaborador.pessoa.email = formObj.email;

    if (formObj.tipoPessoa == 1) {

      this.pessoaColaborador.colaborador.emailCorporativo = formObj.emailCorp;
      this.pessoaColaborador.colaborador.racf = formObj.racf;
      this.pessoaColaborador.colaborador.nomeMaquina = formObj.nomeMaquina;
      this.pessoaColaborador.colaborador.tipoContratacao = formObj.tipoContrato;
      this.pessoaColaborador.colaborador.dataNascimento = formObj.dataNascimento;
      this.pessoaColaborador.colaborador.dataAdmissao = formObj.dataAdmissao;
      this.pessoaColaborador.colaborador.dataDemissao = formObj.dataDemissao;
      this.pessoaColaborador.colaborador.funcaoId = +formObj.funcao;
      this.pessoaColaborador.colaborador.tipoServicoId = +formObj.tipoServico;
      this.pessoaColaborador.colaborador.poloAcessoId = +formObj.poloAcesso;
      this.pessoaColaborador.colaborador.areaContratanteId = formObj.areaContratante;
      this.pessoaColaborador.colaborador.gestorTecnicoCliente = formObj.gestorResponsavel;
      this.pessoaColaborador.colaborador.clt = formObj.clt;
      this.pessoaColaborador.colaborador.scf = formObj.scf;
      this.pessoaColaborador.colaborador.ocupacaoFisicaPoloAdm = formObj.ocupacaoFisica;
      this.pessoaColaborador.colaborador.exclusivoCliente = formObj.exclusivoCliente;
      this.pessoaColaborador.ferramentasAssociadas = this.ferramentasAssociadas;
      this.pessoaColaborador.siglasAssociadas = this.siglasAssociadas;
      this.pessoaColaborador.pessoa.empresa = null;
    } else {
      this.pessoaColaborador.pessoa.empresaId = +formObj.empresa;
      this.pessoaColaborador.pessoa.gestorTecnico = formObj.gestorTecnico;
    }

    this.pessoaColaborador.colaborador.poloAcesso = null;
    this.pessoaColaborador.colaborador.tipoServico = null;
    this.pessoaColaborador.colaborador.areaContratante = null;
    this.pessoaColaborador.colaborador.funcao = null;
    this.pessoaColaborador.pessoa.diretoria = null;
    this.pessoaColaborador.pessoa.tipo = null;

  }


  preferenciaTipoPessoa() {
    const emailCorpControl = this.formularioPessoa.get('emailCorp');
    const tipoContratoControl = this.formularioPessoa.get('tipoContrato');
    const dataNascimentoControl = this.formularioPessoa.get('dataNascimento');
    const dataAdmissaoControl = this.formularioPessoa.get('dataAdmissao');
    const funcaoControl = this.formularioPessoa.get('funcao');
    const tipoServicoControl = this.formularioPessoa.get('tipoServico');
    const poloAcessoControl = this.formularioPessoa.get('poloAcesso');
    const areaContratanteControl = this.formularioPessoa.get('areaContratante');
    const empresaControl = this.formularioPessoa.get('empresa');
    const emailCorp = this.formularioPessoa.get('emailCorp');

    let valorSelecionado = this.formularioPessoa.get('tipoPessoa').value;

    if (valorSelecionado == '1') {
      tipoContratoControl.setValidators(Validators.required);
      dataNascimentoControl.setValidators(Validators.required);
      dataAdmissaoControl.setValidators(Validators.required);
      funcaoControl.setValidators(Validators.required);
      tipoServicoControl.setValidators(Validators.required);
      poloAcessoControl.setValidators(Validators.required);
      areaContratanteControl.setValidators(Validators.required);
      emailCorp.setValidators(Validators.required);
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
      empresaControl.setValidators(Validators.required);
    }

    tipoContratoControl.markAsUntouched();
    tipoContratoControl.updateValueAndValidity();
    dataNascimentoControl.markAsUntouched();
    dataNascimentoControl.updateValueAndValidity();
    dataAdmissaoControl.markAsUntouched();
    dataAdmissaoControl.updateValueAndValidity();
    funcaoControl.markAsUntouched();
    funcaoControl.updateValueAndValidity();
    tipoServicoControl.markAsUntouched();
    tipoServicoControl.updateValueAndValidity();
    poloAcessoControl.markAsUntouched();
    poloAcessoControl.updateValueAndValidity();
    areaContratanteControl.markAsUntouched();
    areaContratanteControl.updateValueAndValidity();
    empresaControl.markAsUntouched();
    empresaControl.updateValueAndValidity();

    emailCorp.markAsUntouched();
    emailCorp.updateValueAndValidity();
  }

  Salvar() {
    this.obterDadosForm();

    if (this.pessoaColaborador.pessoa.id > 0) {


      if (this.pessoaColaborador.pessoa.tipoId == 1) {
        this.pessoaColaborador.colaborador.id = this.colaboradorId;

      }

      this.svc.putViewModel(this.pessoaColaborador, 'pessoa/AtualizarPessoaColaborador')
        .toPromise().then(
          data => {
            this.router.navigate([`pessoas`, { sucesso: true }]);
          },
          error => {
            this.router.navigate([`pessoas`, { erro: true }]);
          }
        );

    } else {
      if (this.pessoaColaborador.colaborador.dataDemissao == undefined || this.pessoaColaborador.colaborador.dataDemissao == null) {
        this.pessoaColaborador.colaborador.dataDemissao = null;
      }
      this.svc.postViewModel(this.pessoaColaborador, 'pessoa/CriarPessoaColaborador')
        .toPromise().then(
          data => {
            this.router.navigate([`pessoas`, { sucesso: true }]);
          },
          error => {
            this.router.navigate([`pessoas`, { erro: true }]);
          }
        );

    }

    this.formularioPessoa.reset();
    this.telefones = [];
    this.ferramentasAssociadas = [];
    this.ferramentasDisponiveis = [];
  }

  cancelar() {
    this.router.navigate(['/pessoas']);
  }
}


