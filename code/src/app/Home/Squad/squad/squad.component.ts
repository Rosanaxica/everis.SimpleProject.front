import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Squad } from 'src/app/_models/squad.model';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.css']
})
export class SquadComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router, private arouter: ActivatedRoute) { }

  squads: Squad[] = [];
  filtroSquad = new Squad();
  msgSucesso: string;

  ngOnInit() {
    this.filtrar();
    this.arouter.paramMap.subscribe(res => {
      var sucesso = res.get("sucesso");
      if (sucesso !== null && sucesso !== undefined && sucesso) {
        alert('Cadastro realizado com sucesso!');
      }
    });
  }

  editar(id: number) {
    this.router.navigate([`/template/squad/cadastro-squad/${id}`]);
  }

  desativar(id: number) {
    this.svc.desativar(Squad, id).toPromise().then(
      s => {
        if (s.sucesso) {
          alert('Cadastro excluído com sucesso!');
          this.filtrar(); //Filtrar ou AtualizarLista? TODO:Apagar comentário
        } else {
          alert(s.mensagem);
        }
      }, e => {
        const err = e.json();
        alert(err.mensagem);
      }
    );
  }

  filtrar() {
    this.filtroSquad.ativo = true;
    this.svc.listar(Squad, this.filtroSquad).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.squads = s.data;
          }
        }
      }
    );
  }

}
