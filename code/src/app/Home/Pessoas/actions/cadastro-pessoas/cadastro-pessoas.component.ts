import { Component, OnInit, Input } from '@angular/core';
import { EmpresaService } from 'src/app/_services/empresa-service.service';
import { PessoaColaboradorViewModel } from 'src/app/_models/pessoacolaborador.viewmodel';
import { Telefone } from 'src/app/_models/telefone.model';
import { Empresa } from 'src/app/_models/empresa.model';
import { PessoaService } from 'src/app/_services/pessoa.service';
import { Colaborador } from 'src/app/_models/colaborador.model';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {

  constructor(private empresaService: EmpresaService,
    private pessoaService: PessoaService, private router: Router) {
  }

  pessoa = new Pessoa();
  colaborador = new Colaborador();
  telefone = new Telefone();
  empresaId: number;
  telefones: Telefone[] = [];
  empresas: Empresa[] = [];
  msgSucesso: String;
  msgErro: String;


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

  SelecionarEmpresa(empresaId: number) {
    this.empresaId = empresaId;
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
    if (this.colaborador.Perfil === undefined) {
      return true;
    }
    return false;
  }

  RemoverTelefone(telefone: Telefone) {
    this.telefones.splice(this.telefones.indexOf(telefone, 1));
  }

  Salvar(form: NgForm) {
    this.msgErro = null;
    this.msgSucesso = null;
    // tslint:disable-next-line:triple-equals
    if (this.pessoa.Tipo == 1) {
      const pessoaColaborador = new PessoaColaboradorViewModel();
      pessoaColaborador.Colaborador = this.colaborador;
      pessoaColaborador.Pessoa = this.pessoa;

      this.pessoaService.AdicionarColaborador(pessoaColaborador)
        .subscribe(
          data => {
            this.msgSucesso = 'Colaborador cadastrado com sucesso!';
          },
          error => {
            this.msgErro = 'Erro ao salvar colaborador';
          }
        );
    } else {
      this.pessoa.EmpresaId = this.empresaId;
      this.pessoaService.AdicionarTerceiro(this.pessoa)
        .subscribe(
          data => {
            this.msgSucesso = 'Terceiro cadastrado com sucesso!';
          },
          error => {
            this.msgErro = 'Erro ao salvar terceiro';
          }
        );
    }

    form.reset();
    this.telefones = [];

  }

  Cancelar() {
    this.router.navigate(['/template/pessoas']);
  }


}
