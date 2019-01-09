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
    this.router.navigate([`/template/projetos/novo-projeto/changes/${this.id}/nova-change/${this.id}/${id}`]);
  }

  desativar(id: number) {
    this.svc.desativar(Change, id).toPromise().then(
      s => {
        if (s.sucesso) {
          alert('Cadastro excluído com sucesso!');
          this.filtrar();
        } else {
          alert(s.mensagem);
        }
      }, e => {
        const err = e.json();
        alert(err.mensagem);
      }
    );
  }

  novaChange() {
    this.router.navigate([`template/projetos/novo-projeto/changes/${this.id}/nova-change/${this.id}`]);
  }

  filtrar() {
    this.filtroChange.projetoId = this.id;
    this.filtroChange.ativo = true;
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
