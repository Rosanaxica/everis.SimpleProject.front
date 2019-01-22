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
  modeloProjeto = new Projeto();

  tipoFase: Array<TipoFaseModel>;
  tipoFaseLista = new Array<TipoFaseModel>({ id: 0, nome: 'Selecione' } as TipoFaseModel);

  colaborador: Array<Pessoa>;
  colaboradorLista = new Array<Pessoa>({ id: 0, nome: 'Selecione' } as Pessoa);

  carregado = false;


//TESTE
  myControl = new FormControl();
  options: Pessoa[] = [];
  filteredOptions: Observable<Pessoa[]>;
  //TESTE



  constructor(private svc: GenericService, private router: Router, 
    private route: ActivatedRoute, private fb: FormBuilder, private datepipe: DatePipe) { }

  ngOnInit() {
    this.carregaTiposFases();
    this.carregaColaboradores();


//TESTE
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Pessoa>(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filter(nome) : this.options.slice())
      );
//TESTE



    this.route.paramMap.subscribe(res => {
      this.idProjeto = +res.get('id');
      this.idFase = +res.get('id2');
      this.modeloFase.projetoId = this.idProjeto;

      if (this.idProjeto !== null && this.idProjeto !== undefined && this.idProjeto > 0) {
        this.modeloProjeto.id = this.idProjeto;
        this.obterModeloNovaFase();
      }

      if (this.idFase !== null && this.idFase !== undefined && this.idFase > 0) {
        this.modeloProjeto.id = this.idProjeto;
        this.modeloFase.id = this.idFase;
        this.obterModeloEditarFase();
      }


      this.criarForm();
    });
  }






  
  //TESTE

  displayFn(user?: Pessoa): string | undefined {
    return user ? user.nome : undefined;
  }

  private _filter(name: string): Pessoa[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
  }
  //TESTE







  

  obterModeloNovaFase() {
    this.svc.obter(this.modeloProjeto).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            let modeloProjeto = s.data as Projeto;
            this.modeloFase.projeto = modeloProjeto;
            this.criarForm(this.modeloFase);
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

            this.svc.obter(this.modeloProjeto).toPromise().then(
              p => {
                if (p.sucesso) {
                  if (p.data != null && p.data !== undefined) {
                    let modelFase = p.data as Projeto;
                    this.modeloFase.projeto = modelFase;
                  }
                }
              }
            );
            
            this.criarForm(this.modeloFase);
          }
        }
      }
    );
  }

  obterModelo() {

    this.svc.obter(this.modeloFase).toPromise().then(
      dados => {
        if (dados.sucesso) {
          this.modeloFase = dados.data as FaseModel;
          this.criarForm(this.modeloFase);
        }
      },
      err => {
        alert("Deu erro");
      });
  }


  carregaTiposFases() {
    this.svc.listar(TipoFaseModel, null, 'ObterTodos').toPromise().then(
      data => {
        this.tipoFaseLista = data.data;
        this.tipoFaseLista.unshift({ id: 0, nome: 'Selecione' } as TipoFaseModel);
        this.carregado = true;
      },
      err => {
        alert("Erro ao carregar os tipos de fases.");
      });
  }

  carregaColaboradores() {
    this.svc.listar(Pessoa, null, 'ObterTodos').toPromise().then(
      data => {
        this.colaboradorLista = data.data;
        this.colaboradorLista.unshift({ id: 0, nome: 'Selecione' } as Pessoa);
        this.carregado = true;
      },
      err => {
        alert("Erro ao carregar colaboradores.");
      });
  }

  private obterDadosForm() {
    console.log(this.modeloFase);
    let formObj = this.formularioFase.value;
    this.modeloFase.qtdHorasDia = formObj.qtdHorasDia;
    this.modeloFase.dataInicio = formObj.dataInicio;
    this.modeloFase.dataFim = formObj.dataFim;
    this.modeloFase.projetoId =  this.idProjeto;
    this.modeloFase.observacao = formObj.observacao;
    this.modeloFase.codigoFase = formObj.codigoFase;
    this.modeloFase.projeto.nome = formObj.nomeProjeto;
    this.modeloFase.pessoaId = +formObj.colaborador;
    this.modeloFase.pessoa = null;
    this.modeloFase.projeto = null;
    this.modeloFase.tipoFase = null;
    this.modeloFase.pessoaId = +formObj.colaborador
    this.modeloFase.tipoFaseId = +formObj.tipoFase;
  }

  salvar() {
    this.obterDadosForm();
    this.svc.salvar(this.modeloFase, FaseModel).toPromise().then(
      data => {
        this.router.navigate([`template/projetos/novo-projeto/fase/${this.idProjeto}`, { sucesso: true }]);

      },
      error => {
        this.msgErro = 'Erro ao salvar';
      }
    );
    // this.formularioFase.reset();
  }

  cancelar() {
    this.router.navigate([`projetos/novo-projeto/fase/${this.idProjeto}`]);
  }

  criarForm(itemFase?: FaseModel) {
    itemFase = itemFase || new FaseModel;

    let dataInicio: any;

    if(this.modeloFase.dataInicio == null) {
      dataInicio = this.datepipe.transform(this.modeloFase.dataInicio, 'dd/MM/yyyy');
    } else {
      dataInicio = this.modeloFase.dataInicio;
    }
    

    this.formularioFase = this.fb.group({
      'qtdHorasDia': [{ value: this.modeloFase.qtdHorasDia, disabled: false }, Validators.required],
      'dataInicio': [{ value: dataInicio, disabled: false }, Validators.required],
      'dataFim': [{ value: this.modeloFase.dataFim, disabled: false }, Validators.required],
      'tipoFase': [{ value: this.modeloFase.tipoFaseId, disabled: false }, Validators.required],
      'observacao': [{ value: this.modeloFase.observacao, disabled: false }, Validators.required],
      'codigoFase': [{ value: this.modeloFase.codigoFase, disabled: false }, Validators.required],
      'codigoProjeto': [{ value: this.modeloFase.projeto.codigoProjeto, disabled: true }, Validators.required],
      'nomeProjeto': [{ value: this.modeloFase.projeto.nome, disabled: true }, Validators.required],
      'colaborador': [{ value: this.modeloFase.pessoaId, disabled: false }, Validators.required],
    });
  }

  formularioValido() {
    const resultado = this.formularioFase.valid;
    return resultado;
  }

}
