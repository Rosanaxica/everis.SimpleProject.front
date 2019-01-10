import { Component, OnInit, Input } from '@angular/core';
import { PessoaColaboradorViewModel } from 'src/app/_models/pessoacolaborador.viewmodel';
import { Telefone } from 'src/app/_models/telefone.model';
import { Empresa } from 'src/app/_models/empresa.model';
import { Colaborador } from 'src/app/_models/colaborador.model';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GenericService } from 'src/app/_services/generic.service';



@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router) {
  }

  pessoa = new Pessoa();
  colaborador = new Colaborador();
  telefone = new Telefone();
  empresaId: number;
  telefones: Telefone[] = [];
  empresas: Empresa[] = [];
  msgSucesso: String;
  msgErro: String;

  disponiveis = new Array<any>();
  associados = new Array<any>();
  paraRemover = new Array<number>();
  paraAdicionar = new Array<number>();

  ngOnInit() {
    this.obterFerramentasDisponiveis();
    // executar a chamada abaixo no momento que finalizar o preenchimento do retorno da pessoa em edição
    // this.obterFerramentasAssociadas();

    this.svc.listar(Empresa).toPromise().then(data => {
      this.empresas = data['data'];
      console.log(this.empresas);
    }
    );
  }

  AddTelefone() {
    this.pessoa.telefones = this.telefones;
    this.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }
  onKeydown() {
    this.pessoa.telefones = this.telefones;
    this.telefones.push(this.telefone);
    // this.telefone = new Telefone();
  }

  SelecionarEmpresa(empresaId: number) {
    this.empresaId = empresaId;
  }

  isTelRequired(): boolean {
    if (this.telefones.length === 0) {
      return true;
    }
    return false;
  }

  isTipoPessoaRequired(): boolean {
    if (this.pessoa.tipo === undefined) {
      return true;
    }
    return false;
  }

  isPerfilRequired(): boolean {
    if (this.colaborador.perfil === undefined) {
      return true;
    }
    return false;
  }

  RemoverTelefone(telefone: Telefone) {
    this.telefones.splice(this.telefones.indexOf(telefone, 1));
  }

  Salvar(form: NgForm) {
    this.msgErro = null;
    this.msgSucesso = null;
    // tslint:disable-next-line:triple-equals
    if (this.pessoa.tipo == 1) {
      const pessoaColaborador = new PessoaColaboradorViewModel();
      pessoaColaborador.colaborador = this.colaborador;
      pessoaColaborador.pessoa = this.pessoa;

      this.svc.postViewModel(pessoaColaborador, 'pessoa/CriarPessoaColaborador')
        .toPromise().then(
          data => {
            this.msgSucesso = 'Colaborador cadastrado com sucesso!';
          },
          error => {
            this.msgErro = 'Erro ao salvar colaborador';
          }
        );
    } else {
      this.pessoa.empresaId = this.empresaId;
      this.svc.salvar(this.pessoa, Pessoa)
        .toPromise().then(
          data => {
            this.msgSucesso = 'Terceiro cadastrado com sucesso!';
          },
          error => {
            this.msgErro = 'Erro ao salvar terceiro';
          }
        );
    }

    form.reset();
    this.telefones = [];

  }

  Cancelar() {
    this.router.navigate(['/template/pessoas']);
  }

  adicionarFerramenta() {
    if (this.paraAdicionar.length == 0) {
      alert('Selecione uma ferramenta para adicionar');
      return;
    } else {
      this.paraAdicionar.forEach(a => {
        let item = this.disponiveis.find(f => f.id == +a);
        let itemIndex = this.disponiveis.indexOf(item);
        this.associados.push(item);
        this.disponiveis.splice(itemIndex, 1);
      });
      this.paraAdicionar = [];
    }
  }
  removerFerramenta() {
    if (this.paraAdicionar.length == 0) {
      alert('Selecione uma ferramenta para remover');
      return;
    } else {
      this.paraRemover.forEach(a => {
        let item = this.associados.find(f => f.id == +a);
        let itemIndex = this.associados.indexOf(item);
        this.disponiveis.push(item);
        this.associados.splice(itemIndex, 1);
      });
      this.paraRemover = [];
    }
  }

  obterFerramentasDisponiveis() {

  }

  obterFerramentasAssociadas() {

  }

}
