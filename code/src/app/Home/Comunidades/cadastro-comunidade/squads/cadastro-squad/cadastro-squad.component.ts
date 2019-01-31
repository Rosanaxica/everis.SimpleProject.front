import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Squad } from 'src/app/_models/squad.model';
import { GenericService } from 'src/app/_services/generic.service';
import { DateFormatPipe } from 'src/app/shared/util/date-format-pipe';

@Component({
  selector: 'app-cadastro-squad',
  templateUrl: './cadastro-squad.component.html',
  styleUrls: ['./cadastro-squad.component.css']
})
export class CadastroSquadComponent implements OnInit {

  constructor(private svc: GenericService, private arouter: ActivatedRoute, private router: Router, private fb: FormBuilder, private formatDate: DateFormatPipe) { }

  msgErro: String;

  id: number;
  formularioSquad: FormGroup;
  modeloSquad: Squad = new Squad();
  comunidadeid :number;

  ngOnInit() {
    this.arouter.paramMap.subscribe(res => {
      this.id = +res.get('id');
      if (this.id !== null && this.id !== undefined && this.id > 0) {
        this.modeloSquad.id = this.id;
        this.obterModelo();
      }
      this.criarForm();
      
      this.comunidadeid = +res.get('comunidadeid');
      if (this.comunidadeid !== null && this.comunidadeid !== undefined && this.comunidadeid > 0) {
        this.modeloSquad.comunidadeid = this.comunidadeid;
      }
    });
  }

  obterModelo() {
    this.svc.obter(this.modeloSquad).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            let squadModel = s.data as Squad;
            this.criarForm(squadModel);
          }
        }
      }
    );
  }

  private obterDadosForm() {
    let objForm = this.formularioSquad.value;
    this.modeloSquad.nome = objForm.nome;
    this.modeloSquad.dataInicio = objForm.datainicio;
    this.modeloSquad.comunidadeid = this.comunidadeid;
  }

  salvar() {
    this.obterDadosForm();
    this.svc.salvar(this.modeloSquad, Squad).toPromise().then(
      data => {
        this.router.navigate([`/comunidades/editar-comunidade/${this.comunidadeid}`]);

      },
      error => {
        this.msgErro = 'Erro ao salvar';
      }
    );
    this.formularioSquad.reset();
  }
  cancelar() {
    this.router.navigate(['/squads']);
  }

  criarForm(itemSquad?: Squad) {
    itemSquad = itemSquad || { nome: '' , dataInicio: new Date()} as Squad;
    this.formularioSquad = this.fb.group({
      'nome': [itemSquad.nome, Validators.required],
      'datainicio': [this.formatDate.transform( itemSquad.dataInicio), Validators.required]
    });
  }
}

