import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { Router } from '@angular/router';
import { Change } from 'src/app/_models/change.model';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router) { }

  changes: Change[] = [];
  filtroChange = new Change();

  ngOnInit() {
    this.filtrar();
  }

  editar(id: number) {
    this.router.navigate([`/template/change/cadastro-change/${id}`]);
  }

  filtrar() {
    this.svc.listar(Change, this.filtroChange).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.changes = s.data;
          }
        }
      }
    );
  }
}