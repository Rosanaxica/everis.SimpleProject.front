import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/_models/empresa.model';
import { GenericService } from 'src/app/_services/generic.service';
import { Router } from '@angular/router';

// import 'rxjs/operator/map';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  constructor(private svc: GenericService, private router: Router) { }

  empresas: Empresa[] = [];
  filtroEmpresa = new Empresa();

  ngOnInit() {
    this.filtrar();
  }

  editar(id: number) {
    this.router.navigate([`/template/empresa/cadastro-empresa/${id}`]);
  }

  desativar(id: number) {
    this.svc.desativar(Empresa, id).toPromise().then(
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
    this.filtroEmpresa.ativo = true;
    this.svc.listar(Empresa, this.filtroEmpresa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.empresas = s.data;
          }
        }
      }
    );
  }
}
