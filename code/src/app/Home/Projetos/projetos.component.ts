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
  statusSelecionados = [
      {id: 1, descricao: 'Em Desenvolvimento', checked: true},
      {id: 2, descricao: 'Aguardando Aprovação', checked: true},
      {id: 3, descricao: 'Concluído', checked: true},
      {id: 4, descricao: 'Entregue', checked: true},
      {id: 5, descricao: 'Aguardando Abertura da SS', checked: true},
      {id: 6, descricao: 'Cancelado', checked: true},
      {id: 7, descricao: 'Proposta', checked: true}
  ];
  filtroProjeto = new Projeto();
  form: FormGroup;

  constructor(private router: Router, private svc: GenericService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.filtrar();
  }

  mudarStatus(id) {
    this.statusSelecionados.find(x => x.id == id).checked = !(this.statusSelecionados.find(x => x.id == id).checked)
  }

  mostrarStatus(id) : boolean {
    return this.statusSelecionados.find(x => x.id == id).checked
  }

  detalheProjeto(projeto: Projeto): void {
    this.router.navigate([`/projetos/novo-projeto/${projeto.id}`]);
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
      if(this.mostrarStatus(element.status.id))
        cont++;
    });
    console.log("total elementos encontrados = " + cont);
    return cont;
  }

  filtrar() {
    this.filtroProjeto.ativo = true;

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
