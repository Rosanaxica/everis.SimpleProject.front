import { PessoaService } from 'src/app/_services/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { PessoaColaboradorViewModel } from 'src/app/_models/pessoacolaborador.viewmodel';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  constructor(private pessoaService: PessoaService) { }

  pessoa = new PessoaColaboradorViewModel();

  ngOnInit() {
    this.pessoaService.ObterTodos().subscribe(data => {
      this.pessoa = data['data'];
      console.log(this.pessoa);
    }
    );
  }

}
