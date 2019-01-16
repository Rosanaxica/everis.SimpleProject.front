import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/_services/generic.service';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Projeto } from 'src/app/_models/projeto.model';
import { Status } from 'src/app/_models/status.model';
import { Router } from '@angular/router';
import { NovoProjetoComponent } from './actions/novo-projeto/novo-projeto.component';
import { ProjetoPessoaModel } from 'src/app/_models/projetopessoa.model';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {
  constructor(private router: Router, private svc: GenericService) { }

  title = 'Projetos';
  projetos: any;
  pessoas: any;
  status: Status[] = [];
  filtroProjeto = new Projeto();

  ngOnInit() {
    this.filtrar();
  }

  detalheProjeto(projeto: Projeto): void {
    this.router.navigate([`/template/projetos/novo-projeto/${projeto.id}`]);
  }


  filtrar() {
    this.filtroProjeto.ativo = true;

    this.svc.listar(Status).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.status = s.data;
          }
        }
      }
    );
    this.svc.listar(Projeto, this.filtroProjeto).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.projetos = s.data;
          }
        }
      }
    );
    this.svc.listar(Pessoa)
      .toPromise().then(
        (result) => {
          console.log(result);
          this.pessoas = result['data'];
        },
        (error) => {
        }
      );
  }

  listarPessoas(projetoId: number) {
    this.svc.listar(ProjetoPessoaModel, null, `PessoasProjeto/${projetoId}`).toPromise().then(
      s => { console.log(s.data); },
      e => { let err = e.json(); alert(`Erro ${err.mensagem}`); }
    )
  }
}
