import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FaseModel } from 'src/app/_models/fase.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { TipoFaseModel } from 'src/app/_models/tipo_fase.model';
import { Projeto } from 'src/app/_models/projeto.model';
import { DatePipe } from '@angular/common';
import { DateFormatPipe } from 'src/app/shared/util/date-format-pipe';

@Component({
  selector: 'app-nova-fase',
  templateUrl: './nova-fase.component.html',
  styleUrls: ['./nova-fase.component.css']
})
export class NovaFaseComponent implements OnInit {

  msgErro: String;

  idProjeto: number;
  idFase: number;
  formularioFase: FormGroup;
  modeloFase: FaseModel = new FaseModel();
  projeto: Projeto = new Projeto();

  tipoFaseLista = new Array<TipoFaseModel>({ id: 0, nome: 'Selecione' } as TipoFaseModel);
  colaboradorLista = new Array<Pessoa>({ id: 0, nome: 'Selecione' } as Pessoa);


  constructor(private svc: GenericService, private router: Router,
    private route: ActivatedRoute, private fb: FormBuilder, private formatDate: DateFormatPipe) { }

  ngOnInit() {
    //Essa estrutura foi feita dessa forma para que cada requisição espere a finalização da requisição anterior
    //Consulta TipoFase
    this.svc.listar(TipoFaseModel, null, 'ObterTodos').toPromise().then(
      data => {
        this.tipoFaseLista = data.data;
        this.tipoFaseLista.unshift({ id: 0, nome: 'Selecione' } as TipoFaseModel);

        // Consulta Pessoas
        this.svc.listar(Pessoa, null, 'ObterTodos').toPromise().then(
          data => {
            this.colaboradorLista = data.data;
            this.colaboradorLista.unshift({ id: 0, nome: 'Selecione' } as Pessoa);


          },
          err => {
            alert("Erro ao carregar colaboradores.");
          });

      },
      err => {
        alert("Erro ao carregar os tipos de fases.");
      },
      );

    //Consulta Fase e projeto
    this.route.paramMap.subscribe(res => {
      this.idProjeto = +res.get('idProjeto');
      this.obterProjeto();
      this.idFase = +res.get('idFase');

      if (this.idFase !== null && this.idFase !== undefined && this.idFase > 0) {
        this.modeloFase.id = this.idFase;
        this.obterModeloEditarFase();
      }
      this.criarForm();
    });

  }
  obterProjeto() {
    this.projeto.id = this.idProjeto;
    this.svc.obter(this.projeto, null).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.projeto = s.data;
          }
        }
      }
    );
  }

  obterModeloEditarFase() {
    this.svc.obter(this.modeloFase).toPromise().then(
      c => {
        if (c.sucesso) {
          if (c.data != null && c.data !== undefined) {
            let modelFase = c.data as FaseModel;
            this.modeloFase = modelFase;

            this.criarForm(this.modeloFase);
          }
        }
      }
    );
  }

  salvar() {
    this.obterDadosForm();
    
    if(this.modeloFase.dataInicio > this.modeloFase.dataFim) {
      alert("Data Fim deve ser maior que Data Início!")
    }
    else {
      this.svc.salvar(this.modeloFase, FaseModel).toPromise().then(
        data => {
          this.router.navigate([`projetos/novo-projeto/fase/${this.idProjeto}`, { sucesso: true }]);
  
        },
        error => {
          this.msgErro = 'Erro ao salvar';
        }
      );
    }

  }

  cancelar() {
    this.router.navigate([`projetos/novo-projeto/fase/${this.idProjeto}`]);
  }

  criarForm(itemFase?: FaseModel) {
    itemFase = itemFase || new FaseModel;

    this.formularioFase = this.fb.group({
      'qtdHorasDia': [{ value: this.modeloFase.qtdHorasDia, disabled: false }, Validators.required],
      'dataInicio': [{ value: this.formatDate.transform( this.modeloFase.dataInicio), disabled: false }, Validators.required],
      'dataFim': [{ value: this.formatDate.transform( this.modeloFase.dataFim), disabled: false }, Validators.required],
      'tipoFase': [{ value: this.modeloFase.tipoFaseId, disabled: false }, Validators.required],
      'observacao': [{ value: this.modeloFase.observacao, disabled: false }, Validators.required],
      'codigoFase': [{ value: this.modeloFase.codigoFase, disabled: false }, Validators.required],
      'colaborador': [{ value: this.modeloFase.pessoaId, disabled: false }, Validators.required],
    });
  }
  private obterDadosForm() {
    let formObj = this.formularioFase.value;
    this.modeloFase.qtdHorasDia = formObj.qtdHorasDia;
    this.modeloFase.dataInicio = formObj.dataInicio;
    this.modeloFase.dataFim = formObj.dataFim;
    this.modeloFase.observacao = formObj.observacao;
    this.modeloFase.codigoFase = formObj.codigoFase;
    this.modeloFase.projetoId = this.idProjeto;
    this.modeloFase.projeto = null;
    this.modeloFase.pessoa = null;
    this.modeloFase.pessoaId = +formObj.colaborador
    this.modeloFase.tipoFase = null;
    this.modeloFase.tipoFaseId = +formObj.tipoFase;
  }

}
