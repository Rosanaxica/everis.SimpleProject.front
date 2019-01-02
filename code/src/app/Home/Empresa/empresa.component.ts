import { Component, OnInit, ErrorHandler } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Empresa } from 'src/app/_models/empresa.model';
import { EmpresaService } from 'src/app/_services/empresa-service.service';
// import 'rxjs/operator/map';

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
      data => {
        this.empresas = data['data'];
      },
      error => console.log('Erro ao obter lista')
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
  Cancelar() {
    this.router.navigate(['/template']);
  }
}
