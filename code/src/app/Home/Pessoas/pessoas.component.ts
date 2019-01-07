import { Colaborador } from './../../_models/colaborador.model';
import { PessoaService } from 'src/app/_services/pessoa.service';
import { Component, OnInit } from '@angular/core';

import { Pessoa } from 'src/app/_models/pessoa.model';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  constructor(private pessoaService: PessoaService) { }

  colaboradores: Colaborador[] = [];
  pessoas: Pessoa[] = [];

  ngOnInit() {
    this.pessoaService.ObterTodasPessoas().subscribe(data => {
      this.pessoas = data['data'];
      console.log(this.pessoas);
    });
  }

}
