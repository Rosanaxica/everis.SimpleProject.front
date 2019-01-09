import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { Change } from 'src/app/_models/change.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router, private arouter: ActivatedRoute) { }

  changes: Change[] = [];
  filtroChange = new Change();
  id: number;

  ngOnInit() {
    this.arouter.paramMap.subscribe(res => {
      this.id = +res.get('id');
    });
    this.filtrar();
  }

  editar(id: number) {
    this.router.navigate([`/template/change/nova-change/${id}`]);
  }

  novaChange() {
    this.router.navigate([`template/projetos/novo-projeto/changes/${this.id}/nova-change/${this.id}`]);
  }

  filtrar() {
    this.filtroChange.projetoId = this.id;
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

  // filtrarPorId() {
  //   this.filtroChange.projetoId = this.id;
  //   this.svc.listar(Change, this.filtroChange).toPromise().then(
  //     s => {
  //       if (s.sucesso) {
  //         if (s.data != null && s.data !== undefined) {
  //           this.changes = s.data;
  //         }
  //       }
  //     }
  //   );
  // }
}
