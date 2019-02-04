import { Colaborador } from './../../../../_models/colaborador.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { GenericService } from 'src/app/_services/generic.service';
import { Router } from '@angular/router';
import { equal } from 'assert';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  senha: string;
  novaSenha: string;
  confirmaNovaSenha: string;
  colaborador = new Colaborador();

  rForm: FormGroup;
  post: any;

  constructor(private svc: GenericService, private router: Router, private fb: FormBuilder) {
    this.rForm = fb.group({
      'senha': [null, Validators.required],
      'novaSenha' : [null, Validators.required],
      'confirmaNovaSenha' : [null, Validators.required, ],

    });
  }


  ngOnInit() {
  }
  salvaSenhaAlterada(senha?: string) {
    this.colaborador.senha = "ricardo123";
    this.novaSenha = this.novaSenha;
    this.confirmaNovaSenha = this.confirmaNovaSenha;
      if (this.novaSenha !== this.confirmaNovaSenha) {
        window.alert("Senha não confere");
      } else {
        this.colaborador.senha = this.novaSenha;
        window.alert("Senha atualizada com sucesso!");
      }
  }
}
