import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GenericService } from 'src/app/_services/generic.service';
import { Projeto } from 'src/app/_models/projeto.model';
import { Change } from 'src/app/_models/change.model';


@Component({
  selector: 'app-nova-change',
  templateUrl: './nova-change.component.html',
  styleUrls: ['./nova-change.component.css']
})
export class NovaChangeComponent implements OnInit {
  [x: string]: any;

  constructor(private svc: GenericService, private arouter: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  msgSucesso: String;
  msgErro: String;

  modeloProjeto = new Projeto();
  change = new Change();
  idProjeto: number;
  idChange: number;
  formularioChange: FormGroup;


  ngOnInit() {
    this.criarForm();
    this.arouter.paramMap.subscribe(res => {

      this.idProjeto = +res.get('id2');
      this.idChange = +res.get('id3');

      if (this.idProjeto !== null && this.idProjeto !== undefined && this.idProjeto > 0) {
        this.modeloProjeto.id = this.idProjeto;
        this.obterModeloNovaChange();
      }

      if (this.idChange !== null && this.idChange !== undefined && this.idChange > 0) {
        this.modeloProjeto.id = this.idProjeto;
        this.change.id = this.idChange;
        this.obterModeloEditarChange();
      }
    });
  }

  obterModeloNovaChange() {
    this.svc.obter(this.modeloProjeto).toPromise().then(
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

  obterModeloEditarChange() {
    this.svc.obter(this.change).toPromise().then(
      c => {
        if (c.sucesso) {
          if (c.data != null && c.data !== undefined) {
            let modeloChange = c.data as Change;
            this.change = modeloChange;

            this.svc.obter(this.modeloProjeto).toPromise().then(
              p => {
                if (p.sucesso) {
                  if (p.data != null && p.data !== undefined) {
                    let modeloChange = p.data as Projeto;
                    this.change.projeto = modeloChange;
                  }
                }
              }
            );
            console.log(this.change)
            this.criarForm(this.change);
          }
        }
      }
    );
  }

  private obterDadosForm() {
    let objForm = this.formularioChange.value;
    this.change.projeto = objForm.nomeProjeto;
    this.change.qtdHorasServico1 = objForm.qtdhorasservico1;
    this.change.qtdHorasServico2 = objForm.qtdhorasservico2;
    this.change.qtdHorasServico3 = objForm.qtdhorasservico3;
    this.change.descricao = objForm.descricao;
  }

  salvar() {
    this.obterDadosForm();
    this.svc.salvar(this.change, Change).toPromise().then(
      data => {
        this.router.navigate([`template/projetos/novo-projeto/changes/${this.idProjeto}`, { sucesso: true }]);
      },
      error => {
        this.msgErro = 'Erro ao salvar';
      }
    );
    this.formularioChange.reset();
  }

  criarForm(itemChange?: Change) {
    itemChange = itemChange || new Change();
    this.formularioChange = this.fb.group({
      'nomeProjeto': [{ value: itemChange.projeto ? itemChange.projeto.nome : '', disabled: true }, Validators.required],
      'qtdhorasservico1': [itemChange.qtdHorasServico1, Validators.required],
      'qtdhorasservico2': [itemChange.qtdHorasServico2, Validators.required],
      'qtdhorasservico3': [itemChange.qtdHorasServico3, Validators.required],
      'descricao': [itemChange.descricao, Validators.required]
    });
  }


  cancelar() {
    this.router.navigate([`template/projetos/novo-projeto/changes/${this.idProjeto}`]);
  }

}
