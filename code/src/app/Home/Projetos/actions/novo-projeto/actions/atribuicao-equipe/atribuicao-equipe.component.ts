import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private svc: GenericService, private router: Router, private arouter: ActivatedRoute) { }
  @Output() getProjeto = new EventEmitter<string>();
  nomeProjeto: string;
  filtroPessoa = new Pessoa();
  filtroProjetoPessoa = new ProjetoPessoa();
  projetoPessoa: ProjetoPessoa[] = [];
  pessoas: Pessoa[] = [];
  projeto = new Projeto();
  atribuicoes: ProjetoPessoaAtribuicao[] = [];
  idAtribuicao: number;
  responsavel: boolean;
  id: number;


  ngOnInit() {
    this.id = 0;
    this.arouter.paramMap.subscribe(res => {
      this.id = +res.get('id');
    });
    this.getAtribuicoes();
  }

  OpenView(projeto: Projeto) {
    this.nomeProjeto = projeto.nome;
    this.projeto = projeto;
    this.filtroProjetoPessoa.projetoId = projeto.id;
    this.filtroProjetoPessoa.ativo = true;
    this.svc.listar(ProjetoPessoa, this.filtroProjetoPessoa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.projetoPessoa = s.data;
          }
        }
      }
    );
  }
  cancelar() {
    this.router.navigate(['/projetos']);
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
            this.verificaAdicionados();
          }
        }
      }
    );
  }
  Adicionar(pessoa: Pessoa) {
    let projPessoa = new ProjetoPessoa();
    projPessoa.pessoaId = pessoa.id;
    projPessoa.pessoa = pessoa;
    this.projetoPessoa.push(projPessoa);
    this.verificaAdicionados();
  }
  RemoverPessoa(projetoPessoa: ProjetoPessoa) {
    let index: number = this.projetoPessoa.indexOf(projetoPessoa);
    this.projetoPessoa.splice(index, 1);
    this.verificaAdicionados();
  }
  getAtribuicoes() {

    this.svc.listar(ProjetoPessoaAtribuicao, null, "ObterTodos").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.atribuicoes = s.data;
            this.atribuicoes.unshift({ id: 0, atribuicao: 'Selecione' } as ProjetoPessoaAtribuicao);

          }
        }
      }
    );
  }
  getAtribuicao(pp: ProjetoPessoa) {
    this.projetoPessoa.forEach(projPessoa => {
      if (projPessoa.pessoaId == pp.pessoaId) {
        projPessoa.atribuicaoId = this.idAtribuicao;
        projPessoa.responsavel = this.responsavel;
      }
    });
  }
  popAtribuicao(idAtribuicao: number, idPessoa: number) {
    debugger;
    this.idAtribuicao = idAtribuicao;
    let projetoPessoa = this.projetoPessoa.find(x => x.pessoaId == idPessoa);
    this.projetoPessoa.forEach(pp => {
      if (pp.pessoa.id == idPessoa) {
        projetoPessoa.atribuicaoId = idAtribuicao;
        projetoPessoa = projetoPessoa;
      }
    });
  }
  popResponsavel(responsavel: boolean) {
    this.responsavel = responsavel;
  }
  salvar() {

    //this.getProjeto.emit("2");
    if (this.projeto.id == undefined) {
      if (this.informadoResponsavel() && this.informadaFuncao() == 0 && this.projetoPessoa.length > 0) {
        this.salvarProjeto();
        this.router.navigate(['/projetos', { sucesso: true }]);
      } else {
        if (!this.informadoResponsavel()) {
          window.alert('Erro: Não foi informado responsável pelo projeto');
        }
        if (this.informadaFuncao() > 0) {
          window.alert('Erro: Favor informar a função para todas as pessoas associadas ao projeto ');
        }

        if (this.projetoPessoa.length < 1) {
          window.alert('Erro: Favor adicionar ao menos uma pessoa na equipe ');
        }
        return;
      }
    } else {
      if (this.informadoResponsavel() && this.informadaFuncao() == 0 && this.projetoPessoa.length > 0) {
        this.comparaListaXBanco();
        this.router.navigate(['/projetos', { sucesso: true }]);
      } else {
        if (!this.informadoResponsavel()) {
          window.alert('Erro: Não foi informado responsável pelo projeto');
        }
        if (this.informadaFuncao() > 0) {
          window.alert('Erro: Favor informar a função para todas as pessoas associadas ao projeto ');
        }

        if (this.projetoPessoa.length < 1) {
          window.alert('Erro: Favor adicionar ao menos uma pessoa na equipe ');
        }
        return;
      }

    }
  }
  salvarProjeto() {

    this.svc.salvar(this.projeto, Projeto)
      .toPromise().then((data: any) => {
        switch (data.codigo) {
          case 200:
            this.projeto = data.data;
            this.comparaListaXBanco();
            break;
          default:
            window.alert('erro: ' + data.mensagem);
            break;
        }
      },
        error => {
          alert('Erro ao tentar adicionar.');
        });


  }
  comparaListaXBanco() {
    let listaProjetoPessoaBanco: ProjetoPessoa[] = [];
    this.svc.listar(ProjetoPessoa, this.filtroProjetoPessoa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            listaProjetoPessoaBanco = s.data;
          }
        }
        this.SincronizaBD(listaProjetoPessoaBanco);
        this.salvarProjetoPessoa(listaProjetoPessoaBanco);
      }
    );
  }
  informadoResponsavel(): boolean {
    let retorno: boolean = false;
    this.projetoPessoa.forEach(projPessoa => {
      if (projPessoa.responsavel) {
        retorno = true;
      }
    });
    return retorno;
  }

  informadaFuncao(): number {

    let retorno: number = 0;

    this.projetoPessoa.forEach(projetoPessoa => {
      if (projetoPessoa.atribuicaoId == null || projetoPessoa.atribuicaoId == undefined || projetoPessoa.atribuicaoId == 0) {
        retorno = retorno + 1;
      }
    });

    return retorno;
  }

  verificaAdicionados() {
    this.pessoas.forEach(p => {
      p.adicionado = false;
      this.projetoPessoa.forEach(projPessoa => {
        if (projPessoa.pessoaId == p.id) {
          p.adicionado = true;
        }
      });
    });
  }
  SincronizaBD(listaProjetoPessoaBanco: ProjetoPessoa[]) {
    let encontrado: boolean = false;
    let pPessoa: ProjetoPessoa = new ProjetoPessoa();

    //Verifica o que tem no banco comparando com a lista da tela. Se estiver na lista do banco
    // e não estiver na lista da tela, deve inativar o registro no banco
    listaProjetoPessoaBanco.forEach(p => {
      this.projetoPessoa.forEach(projPessoa => {
        if (projPessoa.pessoaId == p.pessoaId) {
          encontrado = true;
          pPessoa = projPessoa;
        }
      });
      if (!encontrado) {
        p.ativo = false;
      } else {
        p = pPessoa;
        encontrado = false;
      }
    });
    // Se não estiver na lista do banco e estiver na lista da tela, deve adicionar o registro no banco

    this.projetoPessoa.forEach(projPessoa => {
      if (listaProjetoPessoaBanco.length > 0) {
        listaProjetoPessoaBanco.forEach(p => {
          if (projPessoa.pessoaId == p.pessoaId) {
            encontrado = true;
            p.atribuicaoId = projPessoa.atribuicaoId;
          } else {
            pPessoa = projPessoa;
          }
        });
      } else {
        pPessoa = projPessoa;
      }
      if (!encontrado) {
        listaProjetoPessoaBanco.push(pPessoa)
      } else {
        encontrado = false;
      }
    });
  }
  salvarProjetoPessoa(listaProjetoPessoaBanco: ProjetoPessoa[]) {
    let pessoa: Pessoa = new Pessoa();
    listaProjetoPessoaBanco.forEach(projPessoa => {
      pessoa = projPessoa.pessoa;
      projPessoa.pessoa = null;
      projPessoa.projetoId = this.projeto.id;

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
      projPessoa.pessoa = pessoa;
    });
  }
}
