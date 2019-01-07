import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../../_models/empresa.model';
import { GenericService } from '../../../_services/generic.service';

@Component({
  selector: 'app-nova-empresa',
  templateUrl: './nova-empresa.component.html',
  styleUrls: ['./nova-empresa.component.css']
})
export class NovaEmpresaComponent implements OnInit {


  constructor(private svc: GenericService, private router: Router) { }


  empresa = new Empresa();
  msgSucesso: String;
  msgErro: String;
  empresas: Empresa[] = [];

  ngOnInit() {
    this.svc.listar(Empresa, this.empresa).toPromise().then(
      data => {
        this.empresas = data['data'];
      },
      error => console.log('Erro ao obter lista')
    );
  }

  Salvar(form: NgForm) {
    this.svc.salvar(this.empresa, Empresa).toPromise().then(
      data => {
        this.msgSucesso = 'Cadastro realizado com sucesso!';
      },
      error => {
        this.msgErro = 'Erro ao salvar';
      }
    );
    form.reset();
  }


  Cancelar() {
    this.router.navigate(['/template']);
  }
}


