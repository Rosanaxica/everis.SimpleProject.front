import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/_models/empresa.model';
import { GenericService } from 'src/app/_services/generic.service';

// import 'rxjs/operator/map';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  constructor(private svc: GenericService) { }

  empresas: Empresa[] = [];
  filtroEmpresa = new Empresa();

  ngOnInit() {
    this.filtrar();
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
