import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GenericService } from 'src/app/_services/generic.service';
import { Projeto } from 'src/app/_models/projeto.model';
import { SolicitacaoMudanca } from 'src/app/_models/solicitacao_mudanca.model';


@Component({
  selector: 'app-nova-solicitacao-mudanca',
  templateUrl: './nova-solicitacao-mudanca.component.html',
  styleUrls: ['./nova-solicitacao-mudanca.component.css']
})
export class NovaSolicitacaoMudanca implements OnInit {
  [x: string]: any;

  constructor(private svc: GenericService, private arouter: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  msgSucesso: String;
  msgErro: String;

  modeloProjeto = new Projeto();
  solicitacaoMudanca = new SolicitacaoMudanca();
  idProjeto: number;
  idSolicitacaoMudanca: number;
  formularioSolicitacaoMudanca: FormGroup;


  ngOnInit() {
    this.criarForm();
    this.arouter.paramMap.subscribe(res => {

      this.idProjeto = +res.get('id');
      this.idSolicitacaoMudanca = +res.get('id2');
      this.solicitacaoMudanca.projetoId = this.idProjeto;

      if (this.idProjeto !== null && this.idProjeto !== undefined && this.idProjeto > 0) {
        this.modeloProjeto.id = this.idProjeto;
        this.obterModeloNovaSolicitacaoMudanca();
      }

      if (this.idSolicitacaoMudanca !== null && this.idSolicitacaoMudanca !== undefined && this.idSolicitacaoMudanca > 0) {
        this.modeloProjeto.id = this.idProjeto;
        this.solicitacaoMudanca.id = this.idSolicitacaoMudanca;
        this.obterModeloEditarSolicitacaoMudanca();
      }
    });
  }

  obterModeloNovaSolicitacaoMudanca() {
    this.svc.obter(this.modeloProjeto).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            let modeloProjeto = s.data as Projeto;
            this.solicitacaoMudanca.projeto = modeloProjeto;
            this.criarForm(this.solicitacaoMudanca);
          }
        }
      }
    );
  }

  obterModeloEditarSolicitacaoMudanca() {
    this.svc.obter(this.solicitacaoMudanca).toPromise().then(
      c => {
        if (c.sucesso) {
          if (c.data != null && c.data !== undefined) {
            let modeloSolicitacaoMudanca = c.data as SolicitacaoMudanca;
            this.solicitacaoMudanca = modeloSolicitacaoMudanca;

            this.svc.obter(this.modeloProjeto).toPromise().then(
              p => {
                if (p.sucesso) {
                  if (p.data != null && p.data !== undefined) {
                    let modeloSolicitacaoMudanca = p.data as Projeto;
                    this.solicitacaoMudanca.projeto = modeloSolicitacaoMudanca;
                  }
                }
              }
            );
            this.criarForm(this.solicitacaoMudanca);
          }
        }
      }
    );
  }

  private obterDadosForm() {
    let objForm = this.formularioSolicitacaoMudanca.value;
    this.solicitacaoMudanca.projeto = objForm.nomeProjeto;
    this.solicitacaoMudanca.qtdHorasServico1 = objForm.qtdhorasservico1;
    this.solicitacaoMudanca.qtdHorasServico2 = objForm.qtdhorasservico2;
    this.solicitacaoMudanca.qtdHorasServico3 = objForm.qtdhorasservico3;
    this.solicitacaoMudanca.descricao = objForm.descricao;
  }

  salvar() {
    this.obterDadosForm();
    this.svc.salvar(this.solicitacaoMudanca, SolicitacaoMudanca).toPromise().then(
      data => {
        this.router.navigate([`projetos/novo-projeto/solicitacao-mudanca/${this.idProjeto}`, { sucesso: true }]);
      },
      error => {
        this.msgErro = 'Erro ao salvar';
      }
    );
  }

  criarForm(itemSolicitacaoMudanca?: SolicitacaoMudanca) {
    itemSolicitacaoMudanca = itemSolicitacaoMudanca || new SolicitacaoMudanca();
    this.formularioSolicitacaoMudanca = this.fb.group({
      'nomeprojeto': [{ value: itemSolicitacaoMudanca.projeto ? itemSolicitacaoMudanca.projeto.nome : '', disabled: true }, Validators.required],
      'qtdhorasservico1': [itemSolicitacaoMudanca.qtdHorasServico1, Validators.required],
      'qtdhorasservico2': [itemSolicitacaoMudanca.qtdHorasServico2, Validators.required],
      'qtdhorasservico3': [itemSolicitacaoMudanca.qtdHorasServico3, Validators.required],
      'descricao': [itemSolicitacaoMudanca.descricao, Validators.required]
    });
  }

  cancelar() {
    this.router.navigate([`projetos/novo-projeto/solicitacao-mudanca/${this.idProjeto}`]);
  }

}
