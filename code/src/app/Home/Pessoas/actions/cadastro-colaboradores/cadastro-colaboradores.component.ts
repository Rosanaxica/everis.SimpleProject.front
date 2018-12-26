import { Component, OnInit } from '@angular/core';
import { Colaborador, FuncaoColaborador, PerfilColaborador } from './colaborador.model';
import { Empresa } from 'src/app/Home/Empresa/empresa.model';
import { TipoPessoa } from '../../pessoa.model';
import { Telefone } from '../../telefone.model';

@Component({
  selector: 'app-cadastro-colaboradores',
  templateUrl: './cadastro-colaboradores.component.html',
  styleUrls: ['./cadastro-colaboradores.component.css']
})
export class CadastroColaboradoresComponent implements OnInit {

  telefones: Telefone[] = [];
  telefone = new Telefone();
  colaborador = new Colaborador();

  constructor() {
    this.colaborador.Telefones = this.telefones;
  }

  ngOnInit() {
  }

  AddTelefone() {
    this.telefones.push(this.telefone);
  }

}
