import { Component, OnInit, Input } from '@angular/core';
import { Empresa, TipoSeguimento } from 'src/app/Home/Empresa/empresa.model';
import { Telefone } from '../../telefone.model';
import { PessoaColaboradorViewModel } from '../../pessoacolaborador.viewmodel';
import { EmpresaService } from 'src/app/Home/Empresa/empresa-service.service';

@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {

  constructor(private empresaService: EmpresaService) {
  }

  pessoa = new PessoaColaboradorViewModel();
  telefone = new Telefone();
  telefones: Telefone[] = [];
  empresas: Empresa[] = [];


  ngOnInit() {
    this.empresaService.ObterLista().subscribe(
      data => { this.empresas = data; },
      error => console.log('Erro ao obter lista')
    );
  }

  AddTelefone() {
    this.pessoa.Telefones = this.telefones;
    this.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  SelecionarEmpresa(empresa: Empresa): void {
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

  isPerfilRequired(): boolean {
    if (this.pessoa.Perfil === undefined) {
      return true;
    }
    return false;
  }

  RemoverTelefone(telefone: Telefone) {
    this.telefones.splice(this.telefones.indexOf(telefone, 1));
  }
}
