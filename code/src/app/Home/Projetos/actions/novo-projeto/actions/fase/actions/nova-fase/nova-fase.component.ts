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

@Component({
  selector: 'app-nova-fase',
  templateUrl: './nova-fase.component.html',
  styleUrls: ['./nova-fase.component.css']
})
export class NovaFaseComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  id: number;
  modeloFase: FaseModel = new FaseModel();
  formularioFase: FormGroup;

  tipoFase: Array<TipoFaseModel>;
  tipoFaseLista = new Array<TipoFaseModel>({ id: 0, nome: 'Selecione' } as TipoFaseModel);
  carregado = false;

  options: Pessoa[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<Pessoa[]>;

  ngOnInit() {
    this.carregaTiposFases();
    this.listaPessoas();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Pessoa>(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(name => name ? this._filter(name) : this.options.slice())
      );

    this.route.paramMap.subscribe(res => {
      this.id = +res.get('id');
      if (this.id != null && this.id !== undefined && this.id > 0) {
        this.modeloFase.id = this.id;
        this.obterModelo();
      }
      this.criarFormulario();
    });
  }

  displayFn(pessoa?: Pessoa): string | undefined {
    return pessoa ? pessoa.nome : undefined;
  }

  private _filter(pessoa: string): Pessoa[] {
    const filterValue = pessoa.toLowerCase();

    return this.options.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
  }

  carregaTiposFases() {
    this.svc.listar(TipoFaseModel, null, 'ObterTodos').toPromise().then(
      data => {
        this.tipoFaseLista = data.data;
        this.tipoFaseLista.unshift({id: 0, nome: 'Selecione' } as TipoFaseModel);
        this.carregado = true;
      },
      err => {
        alert("Deu erro");
      });
  }

  obterModelo() {
    this.svc.obter(this.modeloFase).toPromise().then(
      dados => {
        if (dados.sucesso) {
          this.modeloFase = dados.data as FaseModel;
          this.criarFormulario();
        }
      },
      err => {
        alert("Deu erro");
      });
  }

  salvar() {
    this.svc.salvar(this.modeloFase, FaseModel).toPromise().then(
      data => {
        alert("Salvo com sucesso");
        this.vaiParaFase();
      },
      err => {
        alert("Deu erro");
      });
  }

  criarFormulario(itemFase?: FaseModel) {
    // let verificaLetras = "^(0|[1-9][0-9]*)$";
    let validacao = Validators.compose([Validators.required, Validators.max(24), Validators.maxLength(2)]);

    itemFase = itemFase || null;

    this.formularioFase = this.fb.group({
      'qtdHorasDia': [{ value: this.modeloFase.qtdHorasDia, disabled: false }, validacao],
      'dataInicio': [{ value: this.modeloFase.dataInicio, disabled: false }, Validators.required],
      'dataFim': [{ value: this.modeloFase.dataFim, disabled: false }, Validators.required],
      'tipoFase': [{ value: this.modeloFase.tipoFaseId, disabled: false }, Validators.required],
      'observacao': [{ value: this.modeloFase.observacao, disabled: false }, Validators.required],
      'codigoFase': [{ value: this.modeloFase.codigoFase, disabled: false }, Validators.required],
      // 'codigoProjeto': [{ value: this.modeloFase.projeto.codigoProjeto, disabled: false }, Validators.required],
    });
  }

  formularioValido() {
    const resultado = this.formularioFase.valid;
    return resultado;
  }

  vaiParaFase() {
    this.router.navigate([`template/projetos/novo-projeto/fase/${this.id}`]);
  }

  enterKeyUp(event: any) {
    const pattern = /[0-9]\+$ /;
    let entradaChar = String.fromCharCode(event.charCode);

    if (!pattern.test(entradaChar)) {
      event.preventDefault();
    }
  }

  listaPessoas() {
    this.svc.listar(Pessoa).toPromise().then(pessoas => {
      this.options = pessoas['data'];
    });
  }

  getDadosForm() {
    const formObj = this.formularioFase.value;
    this.modeloFase.qtdHorasDia = formObj.qtdHorasDia;
    this.modeloFase.dataInicio = formObj.dataInicio;
    this.modeloFase.dataFim = formObj.dataFim;
    this.modeloFase.tipoFaseId = formObj.tipoFase;
    this.modeloFase.observacao = formObj.observacao;
    this.modeloFase.codigoFase = formObj.codigoFase;
  }
}
