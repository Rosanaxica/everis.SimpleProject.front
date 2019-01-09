import { Colaborador } from './../../_models/colaborador.model';
import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { Pessoa } from 'src/app/_models/pessoa.model';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  constructor(private svc: GenericService) { }

  colaboradores: Colaborador[] = [];
  pessoas: Pessoa[] = [];
  colaborador = new Colaborador();

  ngOnInit() {
    this.svc.listar(Pessoa).toPromise().then(pessoas => {
      this.pessoas = pessoas['data'];
      this.pessoas.forEach(element => {
        this.svc.obter(this.colaborador, `${element.colaboradorId}`).toPromise().then(colaborador => {
          this.colaborador = colaborador['data']; 
          element.colaborador = this.colaborador;
        });
      });
    });
  }

}
