import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { GenericService } from 'src/app/_services/generic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router) { }

  pessoa = new Pessoa();
  senha: string;

  ngOnInit() {
  }
salvaSenhaAlterada() {
  console.log('oi, eu sou o goku');
    // this.pessoa.colaborador.senha = this.senha;
}
}
