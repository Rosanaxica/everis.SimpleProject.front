import { Component, OnInit } from '@angular/core';
import { Projeto } from 'src/app/models/projeto.model';

@Component({
  selector: 'app-dados-principais',
  templateUrl: './dados-principais.component.html',
  styleUrls: ['./dados-principais.component.css']
})
export class DadosPrincipaisComponent implements OnInit {

  projeto: Projeto;
  projetoService: any;

  constructor() { }

  ngOnInit() {
  }

  Adicionar() {
    this.projetoService.Adicionar(this.projeto)
      .subscribe((data: any) => {
        switch (data.codigo) {
          case 200:
            console.log("ok")
            break;
          default:
            break;
        }
      })
  }
}
