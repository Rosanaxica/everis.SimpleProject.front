import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../../node_modules/@angular/forms';
import { Projeto } from 'src/app/_models/projeto.model';
import { ProjetoService } from 'src/app/_services/projeto.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dados-principais',
  templateUrl: './dados-principais.component.html',
  styleUrls: ['./dados-principais.component.css']
})
export class DadosPrincipaisComponent implements OnInit {
  projeto: Projeto;

  constructor(private formBuilder: FormBuilder, private projetoService: ProjetoService,
    private router: Router) { }
  dadosPrincipaisForm: FormGroup;

  ngOnInit() {
    this.projeto = new Projeto();

    this.dadosPrincipaisForm = this.formBuilder.group(
      {
      }
    );
  }

  Adicionar() {

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

  cancelar() {
    this.router.navigate(['/template/projetos/']);
  }
}
