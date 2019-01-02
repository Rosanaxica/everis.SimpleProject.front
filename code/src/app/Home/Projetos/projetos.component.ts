import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjetoService } from 'src/app/_services/projeto.service';
import { PessoaService } from 'src/app/_services/pessoa.service';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {
  title = 'Projetos';
  projetos: any;
  pessoas: any;

  constructor(private http: HttpClient, private projetoService: ProjetoService, private pessoaService: PessoaService) { }

  ngOnInit() {
    this.projetoService.ObterTodos()
    .subscribe(
      (result) => {
        console.log(result);
        this.projetos = result.data;
      },
      (error) => {

      }
    );
    this.pessoaService.ObterTodos()
    .subscribe(
      (result) => {
        console.log(result);
        this.pessoas = result.data;
      },
      (error) => {

      }
    );
  }

}
