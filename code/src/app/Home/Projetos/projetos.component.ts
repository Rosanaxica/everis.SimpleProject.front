import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/_services/generic.service';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Projeto } from 'src/app/_models/projeto.model';
import { Status } from 'src/app/_models/status.model';
import { Router } from '@angular/router';
import { NovoProjetoComponent } from './actions/novo-projeto/novo-projeto.component';
import { ProjetoPessoa } from 'src/app/_models/projetopessoa.model';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {
  title = 'Projetos';
  projetos: any;
  pessoas: any;
  status: Status[] = [];
  filtroProjeto = new Projeto();
  form: FormGroup;

  constructor(private router: Router, private svc: GenericService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.filtrar();
  }

  detalheProjeto(projeto: Projeto): void {
    this.router.navigate([`/template/projetos/novo-projeto/${projeto.id}`]);
  }

  listarPessoas(projetoId: number) {
    this.svc.listar(ProjetoPessoa, null, `PessoasProjeto/${projetoId}`).toPromise().then(
      s => { console.log(s.data); },
      e => { let err = e.json(); alert(`Erro ${err.mensagem}`); }
    )
  }
  contar(lista: Array<any>): number {
    let cont = 0;
    lista.forEach(element => {
      cont++;
    });
    return cont;
  }

  filtrar() {
    this.filtroProjeto.ativo = true;

    this.svc.listar(Projeto, this.filtroProjeto).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.projetos = s.data;
            console.log(this.contar(s.data));
          }
        }
      }
    );
    this.svc.listar(Pessoa)
      .toPromise().then(
        (result) => {
          this.pessoas = result['data'];
        },
        (error) => {
        }
      );
    this.svc.listar(Status).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.status = s.data;
          }
        }
      }
    );
  }
}
