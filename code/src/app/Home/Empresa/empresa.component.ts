import { Component, OnInit } from '@angular/core';
import { Empresa, TipoSegmento } from 'src/app/_models/empresa.model';
import { GenericService } from 'src/app/_services/generic.service';
import { Router, ActivatedRoute } from '@angular/router';

// import 'rxjs/operator/map';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  constructor(private svc: GenericService, private router: Router, private arouter: ActivatedRoute) { }

  msgSucesso: any
  empresas: Empresa[] = [];
  filtroEmpresa = new Empresa();
  tipoSegmentoType: typeof TipoSegmento = TipoSegmento;

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

  exportar() {
    this.filtroEmpresa.ativo = true;
    this.svc.exportar(Empresa, "xls").toPromise().then(
      s => {
        let result = s.json();
        if (result.sucesso) {
          this.svc.downloadFile(result);
        }
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
