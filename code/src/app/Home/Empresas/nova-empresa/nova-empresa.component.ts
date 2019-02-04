import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { Empresa } from '../../../_models/empresa.model';
import { GenericService } from '../../../_services/generic.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-nova-empresa',
  templateUrl: './nova-empresa.component.html',
  styleUrls: ['./nova-empresa.component.css']
})
export class NovaEmpresaComponent implements OnInit {

  constructor(private svc: GenericService, private arouter: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  msgErro: String;

  id: number;
  formularioEmpresa: FormGroup;
  modeloEmpresa: Empresa = new Empresa();
  nomeEmpresa: string;
  nome2 = '';

  ngOnInit() {
    this.arouter.paramMap.subscribe(res => {
      this.id = +res.get('id');
      if (this.id !== null && this.id !== undefined && this.id > 0) {
        this.modeloEmpresa.id = this.id;
        this.obterModelo();
      }
      this.criarForm();
    });
  }

  removeEspaco(){
    // this.modeloEmpresa.nome.trim();
  }

  modoEdicao(){
    return this.modeloEmpresa !== null && this.modeloEmpresa !== undefined && this.modeloEmpresa.id > 0; 
  }

  obterModelo() {
    this.svc.obter(this.modeloEmpresa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            let empresaModel = s.data as Empresa;
            this.criarForm(empresaModel);
            this.nomeEmpresa = empresaModel.nome
          }
        }
      }
    );
  }

  private obterDadosForm() {
    let objForm = this.formularioEmpresa.value;
    this.modeloEmpresa.nome = objForm.nome;
    this.modeloEmpresa.segmento = objForm.segmento;
  }

  salvar() {
    this.obterDadosForm();
    this.svc.salvar(this.modeloEmpresa, Empresa).toPromise().then(
      data => {
        this.router.navigate([`/empresas`, { sucesso: true }]);
      },
      error => {
        this.msgErro = 'Erro ao salvar';
      }
    );
    this.formularioEmpresa.reset();
  }
  cancelar() {
    this.router.navigate(['/empresas']);
  }

  criarForm(itemEmpresa?: Empresa) {
    itemEmpresa = itemEmpresa || { nome: '', segmento: 0 } as Empresa;
    this.formularioEmpresa = this.fb.group({
      'nome': [itemEmpresa.nome, Validators.required],
      'segmento': [itemEmpresa.segmento, Validators.required]
    });
  }
}

