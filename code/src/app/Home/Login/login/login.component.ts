import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Colaborador } from '../../../_models/colaborador.model';
import { LoginService } from 'src/app/_services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private svc: LoginService, private fb: FormBuilder) { }

  loginGroup: FormGroup;
  msgErro: String;

  ngOnInit() {
    this.criarForm();
  }

  colaborador = new Colaborador();

  login() {

    this.obterDadosForm();
    this.svc.login(this.colaborador).then(t => {
      
      if (!t) {
        this.msgErro = 'Usuário ou senha inválidos!';
      }
    });

  }

  logout() {
    this.svc.logout();
  }

  vaiParaHome() {
    this.router.navigate(['dashboard']);
  }

  criarForm(itemColaborador?: Colaborador) {
    itemColaborador = itemColaborador || { emailcorporativo: '', senha: '' } as Colaborador;
    this.loginGroup = this.fb.group({
      'user': [itemColaborador.emailcorporativo, Validators.required],
      'senha': [itemColaborador.senha, Validators.required]
    });
  }

  private obterDadosForm() {
    let objForm = this.loginGroup.value;
    this.colaborador.emailcorporativo = objForm.user;
    this.colaborador.senha = objForm.senha;
  }
}
