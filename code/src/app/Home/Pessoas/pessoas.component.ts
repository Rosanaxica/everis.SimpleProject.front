import { PessoaService } from 'src/app/_services/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { PessoaColaboradorViewModel } from 'src/app/_models/pessoacolaborador.viewmodel';
import { Pessoa } from 'src/app/_models/pessoa.model';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  constructor(private pessoaService: PessoaService) { }

  pessoas: Pessoa[] = [];

  ngOnInit() {
    this.pessoaService.ObterTodos().subscribe(data => {
      this.pessoas = data['data'];
      console.log(this.pessoas);
    }
    );
  }

}
