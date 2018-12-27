import { Component, OnInit, Input } from '@angular/core';
import { Colaborador, FuncaoColaborador, PerfilColaborador } from './colaborador.model';
import { Empresa } from 'src/app/Home/Empresa/empresa.model';
import { TipoPessoa, Pessoa } from '../../pessoa.model';
import { Telefone } from '../../telefone.model';

@Component({
  selector: 'app-cadastro-colaboradores',
  templateUrl: './cadastro-colaboradores.component.html',
  styleUrls: ['./cadastro-colaboradores.component.css']
})
export class CadastroColaboradoresComponent implements OnInit {

  @Input() recebePessoa = new Pessoa();
  colaborador = new Colaborador();
  telefones: Telefone[] = [];
  telefone = new Telefone();

  constructor() {}

  ngOnInit() {
    this.colaborador.Documento = this.recebePessoa.Documento;
    this.colaborador.Email = this.recebePessoa.Email;
    this.colaborador.FotoPath = this.recebePessoa.FotoPath;
    this.colaborador.Nome = this.recebePessoa.Nome;
  }

  AddTelefone() {
    this.colaborador.Telefones = this.telefones;
    this.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

}
