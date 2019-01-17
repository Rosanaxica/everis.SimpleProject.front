import { Component, OnInit, Input } from '@angular/core';
import { PessoaColaboradorViewModel } from 'src/app/_models/pessoacolaborador.viewmodel';
import { Telefone } from 'src/app/_models/telefone.model';
import { Empresa } from 'src/app/_models/empresa.model';
import { Colaborador } from 'src/app/_models/colaborador.model';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GenericService } from 'src/app/_services/generic.service';
import { Ferramenta } from 'src/app/_models/ferramenta.model';
import { AcessoFerramenta } from 'src/app/_models/acessoFerramenta';
import { Sigla } from 'src/app/_models/sigla.model';
import { AcessoSigla } from 'src/app/_models/acessoSigla.model';



@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router) {
  }

  pessoaColaborador = new PessoaColaboradorViewModel();
  acessoFerramenta = new AcessoFerramenta();
  acessoSigla = new AcessoSigla();
  pessoa = new Pessoa();
  filtroFerramenta = new Ferramenta();
  colaborador = new Colaborador();
  telefone = new Telefone();
  telefones: Telefone[] = [];
  empresas: Empresa[] = [];

  empresaId: number;
  msgSucesso: String;
  msgErro: String;

  siglasDisponiveis: Sigla[] = []
  siglasAssociadas: Sigla[] = []
  btnRemoverSiglas: Sigla[] = [];
  btnAdicionarSiglas: Sigla[] = [];

  ferramentasDisponiveis: Ferramenta[] = [];
  ferramentasAssociadas: Ferramenta[] = [];
  btnRemoverFerramentas: Ferramenta[] = [];
  btnAdicionarFerramentas: Ferramenta[] = [];


  ngOnInit() {


    if (this.pessoa.id == undefined && this.pessoa.colaboradorId == undefined) {
      this.obterFerramentas();
      this.obterSiglas()
    } else {
      this.obterFerramentasDisponiveis();
    }
    // executar a chamada abaixo no momento que finalizar o preenchimento do retorno da pessoa em edição
    // this.obterFerramentasAssociadas();

    this.svc.listar(Empresa).toPromise().then(data => {
      this.empresas = data['data'];
      console.log(this.empresas);
    }
    );
  }

  AddTelefone() {
    this.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }
  onKeydown() {
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
      this.pessoaColaborador.colaborador = this.colaborador;
      this.pessoaColaborador.pessoa = this.pessoa;

      if (this.pessoaColaborador.pessoa.id == undefined && this.pessoaColaborador.colaborador.id == undefined) {
        debugger;
        this.atribuirAcessoFerramenta();
        this.atribuirAcessoSigla();
      }

      this.svc.postViewModel(this.pessoaColaborador, 'pessoa/CriarPessoaColaborador')
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

    this.svc.postViewModel(this.telefones, "AdicionarTelefones")

    form.reset();
    this.telefones = [];
    this.ferramentasAssociadas = [];
    this.ferramentasDisponiveis = [];

  }

  Cancelar() {
    this.router.navigate(['/template/pessoas']);
  }

  adicionarFerramenta() {
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

    this.pessoaColaborador.colaborador.acessos = lstAcesso;

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
    this.pessoaColaborador.colaborador.siglas = lstAcesso;
  }

}
