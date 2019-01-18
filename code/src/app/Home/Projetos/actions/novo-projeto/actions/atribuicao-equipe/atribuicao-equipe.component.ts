import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Projeto } from '../../../../../../_models/projeto.model';
import { ProjetoPessoa } from '../../../../../../_models/projetopessoa.model';
import { Pessoa } from '../../../../../../_models/pessoa.model';
import { Empresa } from '../../../../../../_models/empresa.model';
import { GenericService } from '../../../../../../_services/generic.service';
import { ProjetoPessoaAtribuicao } from '../../../../../../_models/projetopessoaatribuicao.model.';

@Component({
  selector: 'app-atribuicao-equipe',
  templateUrl: './atribuicao-equipe.component.html',
  styleUrls: ['./atribuicao-equipe.component.css']
})
export class AtribuicaoEquipeComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router) { }
  @Output() getProjeto = new EventEmitter<string>();
  nomeProjeto: string;
  filtroPessoa = new Pessoa();
  projetoPessoa: ProjetoPessoa[] = [];
  pessoas: Pessoa[] = [];
  projeto = new Projeto();
  atribuicoes: ProjetoPessoaAtribuicao[] = [];
  idAtribuicao: number;

  ngOnInit() {
    this.getAtribuicoes();
  }

  OpenView(projeto: Projeto) {
    this.nomeProjeto = projeto.nome;
    this.projeto = projeto;
  }
  cancelar() {
    this.router.navigate(['/template/projetos']);
  }
  buscaEmpresa(idEmpresa: number): string {
    let empresaModel: Empresa;
    empresaModel.id = idEmpresa;

    this.svc.obter(empresaModel).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            empresaModel = s.data;
          }
        }
      }
    );
    return empresaModel.nome;
  }
  filtrar() {
    this.filtroPessoa.ativo = true;
    this.svc.listar(Pessoa, this.filtroPessoa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.pessoas = s.data;
          }
        }
      }
    );
  }
  Adicionar(pessoa: Pessoa) {
    let projPessoa = new ProjetoPessoa();
    projPessoa.pessoaId = pessoa.id;
    projPessoa.pessoa = pessoa;
    projPessoa.projetoId = this.projeto.id;
    this.projetoPessoa.push(projPessoa);
  }
  getAtribuicoes() {
    this.svc.listar(ProjetoPessoaAtribuicao, null, "ObterTodos").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.atribuicoes = s.data;
          }
        }
      }
    );
  }
  getAtribuicao(pp: ProjetoPessoa) {
    this.projetoPessoa.forEach(projPessoa => {
      if (projPessoa.pessoaId == pp.pessoaId) {
        projPessoa.atribuicaoId = this.idAtribuicao;
      }
    });
  }
  popAtribuicao(idAtribuicao: number) {
    this.idAtribuicao = idAtribuicao;
  }
  salvar() {
    //this.getProjeto.emit("2");
    this.projetoPessoa.forEach(projPessoa => {
      projPessoa.pessoa = null;
      this.svc.salvar(projPessoa, ProjetoPessoa)
        .toPromise().then((data: any) => {
          switch (data.codigo) {
            case 200:
              break;
            default:
              window.alert('erro: ' + data.mensagem);
              break;
          }
        },
          error => {
            alert('Erro ao tentar adicionar.');
          });
    });
  }

}
