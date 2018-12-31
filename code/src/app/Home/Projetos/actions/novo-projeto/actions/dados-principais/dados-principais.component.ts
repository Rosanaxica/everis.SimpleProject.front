import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../../node_modules/@angular/forms';
import { ProjetoService } from '../../../../../../services/projeto.service';
import { Projeto } from '../../../../../../models/projeto.model';

@Component({
  selector: 'app-dados-principais',
  templateUrl: './dados-principais.component.html',
  styleUrls: ['./dados-principais.component.css']
})
export class DadosPrincipaisComponent implements OnInit {

  projeto = new Projeto();

  constructor(private formBuilder: FormBuilder, private projetoService: ProjetoService) { }
  dadosPrincipaisForm: FormGroup;

  ngOnInit() {
    this.dadosPrincipaisForm = this.formBuilder.group(
      {
        login: ['', Validators.required],
      }
    );
  }

  Adicionar() {
    this.projeto = new Projeto();

    this.projeto.Nome = 'Projeto1';
    this.projeto.QtdHorasServico1 = 5;
    this.projeto.DataInicio = new Date('22/12/2018');
    this.projeto.EscopoProjeto = 'descricao';
    this.projeto.IdEmpresa = 1;
    this.projeto.Status = '1';
    this.projeto.DataPrevista = new Date('31/02/2019');
    this.projeto.CentroCusto = '1';

    this.projetoService.Adicionar(this.projeto)
      .subscribe((data: any) => {
        switch (data.codigo) {
          case 200:
            window.alert('ok');
            break;
          default:
            window.alert('erro');
            break;
        }
      },
        error => {
          alert('Erro ao tentar adicionar.');
        });
  }
}
