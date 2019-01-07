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

  ngOnInit() {
    this.svc.listar(Pessoa).toPromise().then(data => {
      this.pessoas = data['data'];
      console.log(this.pessoas);
    });
  }

}
