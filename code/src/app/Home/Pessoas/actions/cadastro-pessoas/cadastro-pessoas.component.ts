import { Component, OnInit, Input } from '@angular/core';
import { EmpresaService } from 'src/app/_services/empresa-service.service';
import { PessoaColaboradorViewModel } from 'src/app/_models/pessoacolaborador.viewmodel';
import { Telefone } from 'src/app/_models/telefone.model';
import { Empresa } from 'src/app/_models/empresa.model';



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
    this.empresaService.ObterLista().subscribe(data => {
      this.empresas = data['data'];
      console.log(this.empresas);
    }
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
