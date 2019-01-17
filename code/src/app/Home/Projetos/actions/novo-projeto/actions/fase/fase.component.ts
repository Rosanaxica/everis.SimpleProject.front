import { Component, OnInit } from '@angular/core';
import { Projeto } from 'src/app/_models/projeto.model';
import { GenericService } from 'src/app/_services/generic.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html',
  styleUrls: ['./fase.component.css']
})
export class FaseComponent implements OnInit {
  constructor(private svc: GenericService, private router: Router) { }

  projetos: Projeto[] = [];
  filtroProjeto = new Projeto();

  ngOnInit() {
    this.filtrar();
  }

  filtrar() {
    this.svc.listar(Projeto, this.filtroProjeto).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data !== null && s.data !== undefined) {
            this.projetos = s.data;
          }
        }
      }
    );
  }

  vaiParaNovaFase() {
    this.router.navigate(['template/projetos/fase/nova-fase']);
  }

  
}
