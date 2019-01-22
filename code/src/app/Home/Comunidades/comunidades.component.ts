import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Comunidade } from 'src/app/_models/comunidade.model';

// import 'rxjs/operator/map';

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.css']
})
export class ComunidadesComponent implements OnInit {
  constructor(private svc: GenericService, private router: Router, private arouter: ActivatedRoute) { }

  comunidades: Comunidade[] = [];
  filtroComunidade = new Comunidade();


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
    this.router.navigate([`/comunidades/editar-comunidade/${id}`]);
  }

  desativar(id: number) {
    this.svc.desativar(Comunidade, id).toPromise().then(
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
    this.filtroComunidade.ativo = true;
    this.svc.exportar(Comunidade, "xls").toPromise().then(
      s => {
        let result = s.json();
        if (result.sucesso) {
          this.svc.downloadFile(result);
        }
      }
    );
  }
  

  filtrar() {
    this.filtroComunidade.ativo = true;
    this.svc.listar(Comunidade, this.filtroComunidade).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.comunidades = s.data;
          }
        }
      }
    );
  }
}
