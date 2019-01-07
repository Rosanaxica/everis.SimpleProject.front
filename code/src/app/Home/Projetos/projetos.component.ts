import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/_services/generic.service';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Projeto } from 'src/app/_models/projeto.model';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {
  title = 'Projetos';
  projetos: any;
  pessoas: any;

  constructor(private svc: GenericService) { }

  ngOnInit() {
    this.svc.listar(Projeto)
      .toPromise().then(
        (result) => {
          console.log(result);
          this.projetos = result.data;
        },
        (error) => {

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

}
