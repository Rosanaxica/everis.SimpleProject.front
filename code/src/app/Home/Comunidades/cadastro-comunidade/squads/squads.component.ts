import { Component, OnInit, Input } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Squad } from 'src/app/_models/squad.model';
import { DateFormatPipe } from 'src/app/shared/util/date-format-pipe';

// import 'rxjs/operator/map';

@Component({
  selector: 'app-squads',
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.css']
})
export class SquadsComponent implements OnInit {
  constructor(private svc: GenericService, private router: Router, private arouter: ActivatedRoute, private formatDate: DateFormatPipe) { }

  squads: Squad[] = [];
  filtroSquad = new Squad();
  @Input() comunidadeId :number = 0;

  ngOnInit() {
    this.arouter.paramMap.subscribe(res => {
      var sucesso = res.get("sucesso");
      if (sucesso !== null && sucesso !== undefined && sucesso) {
        alert('Cadastro realizado com sucesso!');
      }    
    });
    this.filtroSquad.comunidadeid = this.comunidadeId;
    this.filtrar();
  }

  editar(id: number) {
    this.router.navigate([`/squads/editar-squad/${this.comunidadeId}/${id}`]);
  }
  nova() {
    this.router.navigate([`/squads/incluir-squad/${this.comunidadeId}`]);
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

  exportar() {
    this.filtroSquad.ativo = true;
    this.svc.exportar(Squad, "xls").toPromise().then(
      s => {
        let result = s.json();
        if (result.sucesso) {
          this.svc.downloadFile(result);
        }
      }
    );
  }
  

  filtrar() {
    this.filtroSquad.ativo = true;
    this.filtroSquad.comunidadeid = this.comunidadeId;
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
