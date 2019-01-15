import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/_services/generic.service';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Projeto } from 'src/app/_models/projeto.model';
import { Router } from '@angular/router';
import { NovoProjetoComponent } from './actions/novo-projeto/novo-projeto.component';

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
  filtroProjeto = new Projeto();

  ngOnInit() {
    this.filtrar();

    // this.svc.listar(Projeto)
    //   .toPromise().then(
    //     (result) => {
    //       console.log(result);
    //       this.projetos = result.data;
    //     },
    //     (error) => {

    //     }
    //   );
    // this.svc.listar(Pessoa)
    //   .toPromise().then(
    //     (result) => {
    //       console.log(result);
    //       this.pessoas = result['data'];
    //     },
    //     (error) => {
    //     }
    //   );
  }

  detalheProjeto(projeto: Projeto): void {
    this.router.navigate([`/template/projetos/novo-projeto/${projeto.id}`]);
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
  }

}
