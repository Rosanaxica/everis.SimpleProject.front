import { Component, OnInit, Input } from '@angular/core';
import { Empresa, TipoSeguimento } from 'src/app/Home/Empresa/empresa.model';
import { Telefone } from '../../telefone.model';
import { PessoaColaboradorViewModel } from '../../pessoacolaborador.viewmodel';

@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {

  constructor() {
  }

  pessoa = new PessoaColaboradorViewModel();
  telefone = new Telefone();
  telefones: Telefone[] = [];

  empresas: Empresa[] = [
    {IdEmpresa: 1, Nome: 'Itau', Tipo: TipoSeguimento.Banking},
    {IdEmpresa: 2, Nome: 'Santander', Tipo: TipoSeguimento.Banking},
    {IdEmpresa: 3, Nome: 'Vivo', Tipo: TipoSeguimento.Telecomunicacao}
  ];

  ngOnInit() {
  }

  AddTelefone() {
    this.pessoa.Telefones = this.telefones;
    this.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  SelecionarEmpresa (empresa: Empresa): void {
    this.pessoa.Empresa = empresa;
  }

  isTelRequired(): boolean {
    if (this.telefones.length === 0) {
      return true;
    }
    return false;
  }

  isTipoPessoaRequired(): boolean {
    if (this.pessoa.Tipo === undefined) {
      return true;
    }
    return false;
  }

}
