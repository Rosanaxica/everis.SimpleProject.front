import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Squad } from '../../../../../../_models/squad.model';
import { Pessoa } from '../../../../../../_models/pessoa.model';
import { Empresa } from '../../../../../../_models/empresa.model';
import { GenericService } from '../../../../../../_services/generic.service';
import { SquadPessoa } from 'src/app/_models/squadpessoa.model';

@Component({
  selector: 'app-atribuicao-equipe-squad',
  templateUrl: './atribuicao-equipe-squad.component.html',
  styleUrls: ['./atribuicao-equipe-squad.component.css']
})
export class AtribuicaoEquipeSquadComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router, private arouter: ActivatedRoute) { }
  @Input() squadid: number = 0;
  filtroPessoa = new Pessoa();
  filtroSquadPessoa = new SquadPessoa();
  squadPessoa: SquadPessoa[] = [];
  pessoas: Pessoa[] = [];
  idAtribuicao: number;
  responsavel: boolean;


  ngOnInit() {
    this.filtroSquadPessoa.squadId = this.squadid;
    this.svc.listar(SquadPessoa, this.filtroSquadPessoa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.squadPessoa = s.data;
          }
        }
      }
    );
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
    let sqdPessoa = new SquadPessoa();
    sqdPessoa.pessoaId = pessoa.id;
    sqdPessoa.squadId = this.squadid;
    this.svc.salvar(sqdPessoa, SquadPessoa).toPromise().then(
      s => {
        if (s.sucesso) {
          this.verificaAdicionados();
        }
      }
    );
  }
  RemoverPessoa(sqdPessoa: SquadPessoa) {

    this.svc.excluir(SquadPessoa, sqdPessoa.id).toPromise().then(
      s => {
        if (s.sucesso) {
          this.verificaAdicionados();
        }
      }
    );
  }

  verificaAdicionados() {
    this.svc.listar(SquadPessoa, this.filtroSquadPessoa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.squadPessoa = s.data;

            this.pessoas.forEach(p => {
              p.adicionado = false;
              this.squadPessoa.forEach(sqdPessoa => {
                if (sqdPessoa.pessoaId == p.id) {
                  p.adicionado = true;
                }
              });
            });
          }
        }
      }
    );
  }
  
  salvarSquadPessoa(listaSquadPessoaBanco: SquadPessoa[]) {
    let pessoa: Pessoa = new Pessoa();
    listaSquadPessoaBanco.forEach(sqdPessoa => {
      pessoa = sqdPessoa.pessoa;
      sqdPessoa.pessoa = null;
      sqdPessoa.squadId = this.squadid;

      this.svc.salvar(sqdPessoa, SquadPessoa)
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
      sqdPessoa.pessoa = pessoa;
    });
  }
}
