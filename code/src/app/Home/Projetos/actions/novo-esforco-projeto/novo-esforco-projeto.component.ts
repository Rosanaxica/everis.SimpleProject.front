import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EsforcoProjetoModel } from 'src/app/_models/esforcoprojeto.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-novo-esforco-projeto',
  templateUrl: './novo-esforco-projeto.component.html',
  styleUrls: ['./novo-esforco-projeto.component.css']
})
export class NovoEsforcoProjetoComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  modeloEsforcoProjeto: EsforcoProjetoModel = new EsforcoProjetoModel();
  formularioEsforcoProjeto: FormGroup;


  options: Array<Pessoa>;
  myControl = new FormControl();
  filteredOptions: Observable<Pessoa[]>;

  ngOnInit() {
    this.criarFormulario();
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith<string | Pessoa>(''),
    //     map(value => typeof value === 'string' ? value : value.nome),
    //     map(name => name ? this._filter(name) : this.options.slice())
    //   );
  }

  // displayFn(pessoa?: Pessoa): string | undefined {
  //   return pessoa ? pessoa.nome : undefined;
  // }

  // private _filter(pessoa: string): Pessoa[] {
  //   const filterValue = pessoa.toLowerCase();

  //   return this.options.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
  // }

  salvar() {
    this.svc.salvar(this.modeloEsforcoProjeto, EsforcoProjetoModel).toPromise().then(
      data => {
        console.log(data);
        alert("Salvo com sucesso");
        this.vaiParaEsforcoProjeto();
      },
      err => {
        console.log(err);
        alert("Deu erro");
      });
  }

  criarFormulario() {
    // let verificaLetras = "^(0|[1-9][0-9]*)$";
    let validacao = Validators.compose([Validators.required, Validators.max(24), Validators.maxLength(2)]);

    this.formularioEsforcoProjeto = this.fb.group({
      'qtdHorasDia': [{ value: this.modeloEsforcoProjeto.qtdHorasDia, disabled: false }, validacao],
      'dataInicio': [{ value: this.modeloEsforcoProjeto.dataInicio, disabled: false }, Validators.required],
      'dataFim': [{ value: this.modeloEsforcoProjeto.dataFim, disabled: false }, Validators.required],
    });
  }

  formularioValido() {
    const resultado = this.formularioEsforcoProjeto.valid;
    return resultado;
  }

  vaiParaEsforcoProjeto() {
    this.router.navigate(['template/projetos/novo-projeto/esforco-projeto']);
  }

  enterKeyUp(event: any) {
    const pattern = /[0-9]\+$ /;
    let entradaChar = String.fromCharCode(event.charCode);

    if(!pattern.test(entradaChar)) {
      event.preventDefault();
    }
  }
}
