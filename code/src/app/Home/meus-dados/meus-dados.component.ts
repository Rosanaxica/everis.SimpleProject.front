import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Colaborador } from 'src/app/_models/colaborador.model';
import { Telefone } from 'src/app/_models/telefone.model';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent implements OnInit {

  constructor(private svc: GenericService) { }
  colaboradores: Colaborador[] = [];
  pessoas: Pessoa[] = [];
  telefones: Telefone[] = [];
  colaborador = new Colaborador();
  telefone = new Telefone();

  ngOnInit() {
    this.svc.listar(Pessoa).toPromise().then(pessoas => {
      this.pessoas = pessoas['data'];
      // this.telefones = this.telefones['data'];
      this.pessoas.forEach(element => {
        this.svc.obter(this.colaborador, `${element.colaboradorId}`).toPromise().then(colaborador => {
          this.colaborador = colaborador['data'];
          element.colaborador = this.colaborador;
          this.telefone.pessoaId = element.id;
          this.svc.listar(Telefone, this.telefone).toPromise().then(
            telefones => {
              if (telefones.sucesso) {
                if (telefones.data != null && telefones.data !== undefined) {
                  element.telefones = telefones.data;
                  console.log(element.telefones);
                }
              }
            }
          );
        });
      });
      console.log(this.pessoas);
    });
  }

}
