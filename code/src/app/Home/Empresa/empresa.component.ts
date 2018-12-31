import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  constructor(private svc: EmpresaService, private router: Router) { }


  empresa = new Empresa();
  msgSucesso: String;
  msgErro: String;
  empresas: Empresa[] = [];

  ngOnInit() {
    this.svc.ObterLista().subscribe(
      data => this.empresas = data
    );
  }

  Salvar() {
    console.log('clicado');
    this.svc.Adicionar(this.empresa).subscribe(
      data => {
        this.msgSucesso = 'Cadastro realizado com sucesso!';
      },
      error => {
        this.msgErro = 'Erro ao salvar';
      }
    );
    this.empresa = new Empresa();
  }

  // LimparForm(form: NgForm) {
  //   form.resetForm();
  // }

}
