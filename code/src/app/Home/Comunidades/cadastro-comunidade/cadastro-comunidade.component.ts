import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Comunidade } from 'src/app/_models/comunidade.model';
import { GenericService } from 'src/app/_services/generic.service';

@Component({
  selector: 'app-cadastro-comunidade',
  templateUrl: './cadastro-comunidade.component.html',
  styleUrls: ['./cadastro-comunidade.component.css']
})
export class CadastroComunidadeComponent implements OnInit {

  constructor(private svc: GenericService, private arouter: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  msgErro: String;

  id: number;
  formularioComunidade: FormGroup;
  modeloComunidade: Comunidade = new Comunidade();

  ngOnInit() {
    this.arouter.paramMap.subscribe(res => {
      this.id = +res.get('id');
      if (this.id !== null && this.id !== undefined && this.id > 0) {
        this.modeloComunidade.id = this.id;
        this.obterModelo();
      }
      this.criarForm();
    });
  }

  obterModelo() {
    this.svc.obter(this.modeloComunidade).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            let comunidadeModel = s.data as Comunidade;
            this.criarForm(comunidadeModel);
          }
        }
      }
    );
  }

  private obterDadosForm() {
    let objForm = this.formularioComunidade.value;
    this.modeloComunidade.nome = objForm.nome;
  }

  salvar() {
    this.obterDadosForm();
    this.svc.salvar(this.modeloComunidade, Comunidade).toPromise().then(
      data => {
        this.router.navigate([`/comunidades`, { sucesso: true }]);

      },
      error => {
        this.msgErro = 'Erro ao salvar';
      }
    );
    this.formularioComunidade.reset();
  }
  cancelar() {
    this.router.navigate(['/comunidades']);
  }

  criarForm(itemComunidade?: Comunidade) {
    itemComunidade = itemComunidade || { nome: '' } as Comunidade;
    this.formularioComunidade = this.fb.group({
      'nome': [itemComunidade.nome, Validators.required]
    });
  }
}

