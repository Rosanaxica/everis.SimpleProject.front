import { Component, OnInit, Input } from '@angular/core';
import { PessoaColaboradorViewModel } from 'src/app/_models/pessoacolaborador.viewmodel';
import { Telefone } from 'src/app/_models/telefone.model';
import { Empresa } from 'src/app/_models/empresa.model';
import { Colaborador } from 'src/app/_models/colaborador.model';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Router } from '@angular/router';
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



@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router, private fb: FormBuilder) {
  }

  formularioPessoa: FormGroup;
  numberPattern = /^[0-9]*$/;

  tiposTelefone: TipoTelefone[] = [];
  telefone = new Telefone();
  telefones: Telefone[] = [];


  ngOnInit() {
    this.criarForm();

    this.svc.muitiGet([
      // 'Empresa/ObterTodos',
      // 'Funcao/ObterTodos',
      // 'AreaContratante/ObterTodos',
      // 'PoloAcesso/ObterTodos',
      // 'TipoServico/ObterTodos',
      'TipoTelefone/ObterTodos'
    ]).then(data => {
      // this.empresas = data[0].json().data as Empresa[];
      // this.funcoes = data[1].json().data as Funcao[];
      // this.areasContratantes = data[2].json().data as AreaContratante[];
      // this.polosAcesso = data[3].json().data as PoloAcesso[];
      // this.tipoServicos = data[4].json().data as TipoServico[];
      this.tiposTelefone = data[0].json().data as TipoTelefone[];
    });
  }

  criarForm(pessoaColaborador?: PessoaColaboradorViewModel) {
    pessoaColaborador = pessoaColaborador || new PessoaColaboradorViewModel();
    // pessoaColaborador.pessoa = new Pessoa();
    this.formularioPessoa = this.fb.group({
      'nome': [pessoaColaborador.pessoa.nome, Validators.required],
      'cpf': [pessoaColaborador.pessoa.cpf, [Validators.minLength(11), Validators.maxLength(11), Validators.pattern(this.numberPattern)]],
      'rg': [pessoaColaborador.pessoa.rg],
      'orgaoEmissor': [pessoaColaborador.pessoa.orgaoEmissor],
      'uf': [pessoaColaborador.pessoa.uFRg],
      'documento': [pessoaColaborador.pessoa.documento],
      'tipoTelefone': [pessoaColaborador.tipoTelefone, Validators.required],
      'numeroTelefone': [this.telefone.numeroTelefone, [Validators.minLength(10), Validators.maxLength(15), Validators.pattern("[0-9]{10,15}")]],
    });
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
}
