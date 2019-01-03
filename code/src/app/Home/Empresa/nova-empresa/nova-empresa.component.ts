import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Empresa } from 'src/app/_models/empresa.model';
import { EmpresaService } from 'src/app/_services/empresa-service.service';

@Component({
  selector: 'app-nova-empresa',
  templateUrl: './nova-empresa.component.html',
  styleUrls: ['./nova-empresa.component.css']
})
export class NovaEmpresaComponent implements OnInit {


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


