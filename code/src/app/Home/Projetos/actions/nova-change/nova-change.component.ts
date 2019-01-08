import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Change } from 'src/app/_models/change.model';


@Component({
  selector: 'app-nova-change',
  templateUrl: './nova-change.component.html',
  styleUrls: ['./nova-change.component.css']
})
export class NovaChangeComponent implements OnInit {
  [x: string]: any;

  constructor() { }

  change = new Change();
  msgSucesso: String;
  msgErro: String;

  ngOnInit() {
  }

  Salvar(form: NgForm) {
    this.svc.salvar(this.change, Change).toPromise().then(
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
    this.router.navigate(['/template/projetos/novo-projeto/changes']);
  }

}
