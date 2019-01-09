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

  filtrar() {
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
