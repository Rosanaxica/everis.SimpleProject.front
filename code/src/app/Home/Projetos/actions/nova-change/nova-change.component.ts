import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Change } from 'src/app/_models/change.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/_services/generic.service';
import { Projeto } from 'src/app/_models/projeto.model';


@Component({
  selector: 'app-nova-change',
  templateUrl: './nova-change.component.html',
  styleUrls: ['./nova-change.component.css']
})
export class NovaChangeComponent implements OnInit {
  [x: string]: any;

  constructor(private svc: GenericService, private arouter: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  change = new Change();
  msgSucesso: String;
  msgErro: String;

  id: number;
  formularioChange: FormGroup;
  modeloProjeto = new Projeto();

  ngOnInit() {
    this.arouter.paramMap.subscribe(res => {
      this.id = +res.get('id');
      if (this.id !== null && this.id !== undefined && this.id > 0) {
        this.modeloProjeto.id = this.id;
        this.obterModelo();
      }
      this.criarForm();
    });
  }

  obterModelo() {
    this.svc.obter(this.modeloEmpresa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            let modeloProjeto = s.data as Projeto;
            this.change.projeto = modeloProjeto;
            this.criarForm(this.change);
          }
        }
      }
    );
  }

  criarForm(itemChange?: Change) {
    this.formularioChange = this.fb.group({
      'nomeProjeto': [itemChange.projeto.nome, Validators.required],
      'qtdhorasservico1': [itemChange.qtdHorasServico1, Validators.required],
      'qtdhorasservico2': [itemChange.qtdHorasServico2, Validators.required],
      'qtdhorasservico3': [itemChange.qtdHorasServico3, Validators.required],
      'descricao': [itemChange.descricao, Validators.required]
    });
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
