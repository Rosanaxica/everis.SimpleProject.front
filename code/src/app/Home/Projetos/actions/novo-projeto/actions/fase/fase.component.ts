import { Component, OnInit, Input } from '@angular/core';
import { Projeto } from 'src/app/_models/projeto.model';
import { GenericService } from 'src/app/_services/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FaseModel } from 'src/app/_models/fase.model';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { TipoFaseModel } from 'src/app/_models/tipo_fase.model';


@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html',
  styleUrls: ['./fase.component.css']
})
export class FaseComponent implements OnInit {
  constructor(private svc: GenericService, private router: Router, private arouter: ActivatedRoute) { }

  @Input() projetoId :number = 0;
  res: number = 0;
  msgSucesso: string;

  projetos: Projeto[] = [];
  fases: FaseModel[] = [];

  tipoFase = new TipoFaseModel();
  pessoa = new Pessoa();
  projeto = new Projeto();
  filtroProjeto = new Projeto();
  filtroFases = new FaseModel();

  ngOnInit() {
    this.arouter.paramMap.subscribe(res => {     
      var sucesso = res.get("sucesso");
      if (sucesso !== null && sucesso !== undefined && sucesso) {
        alert('Cadastro realizado com sucesso!');
      }
    });
    this.filtrar();
  }

  filtrar() {
    this.filtroFases.projetoId = this.projetoId;
    this.filtroFases.ativo = true;
    this.svc.listar(FaseModel, this.filtroFases).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.fases = s.data;

          }
        }
      }
    );
  }

  desativar(id: number) {
    this.svc.desativar(FaseModel, id).toPromise().then(
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

  vaiParaNovaFase() {
    this.router.navigate([`projetos/novo-projeto/fase/nova-fase/${this.projetoId}`]);
  }

  editar(id: number) {
    this.router.navigate([`/projetos/novo-projeto/fase/nova-fase/${this.projetoId}/${id}`]);
  }

  
}
