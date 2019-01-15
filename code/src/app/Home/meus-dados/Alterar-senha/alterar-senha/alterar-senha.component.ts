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

      // 'description': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
    });
  }


  ngOnInit() {
  }
  salvaSenhaAlterada() {
    console.log("oi, eu sou o goku!");
    // this.svc.salvar()
    // this.senha = senha;
    this.colaborador.senha = "ricardo123";
    this.novaSenha = this.novaSenha;
    this.confirmaNovaSenha = this.confirmaNovaSenha;
      if (this.novaSenha !== this.confirmaNovaSenha) {
        console.log('senha não confere');
      } else {
        console.log('deu certo, a senha antiga é', this.colaborador.senha);
        this.colaborador.senha = this.novaSenha;
        console.log("a nova senha agora é:", this.colaborador.senha);
      }
  }


  // export class PasswordValidation {

//     static MatchPassword(AC: AbstractControl) {
//        let password = AC.get('password').value; // to get value in input tag
//        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
//         if(password != confirmPassword) {
//             console.log('false');
//             AC.get('confirmPassword').setErrors( {MatchPassword: true} )
//         } else {
//             console.log('true');
//             return null
//         }
//     }
// }
}
