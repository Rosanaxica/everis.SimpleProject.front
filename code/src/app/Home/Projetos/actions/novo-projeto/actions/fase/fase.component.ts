import { Component, OnInit } from '@angular/core';
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

  id: number;
  res: number = 0;
  idle: number = 0;
  overhead: number = 0;
  trabalhas: number = 0;
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
      this.id = +res.get('id');
      var sucesso = res.get("sucesso");
      if (sucesso !== null && sucesso !== undefined && sucesso) {
        this.msgSucesso = 'Cadastro realizado com sucesso!';
      }
    });
    this.filtrar();
  }

  filtrar() {
    this.filtroFases.projetoId = this.id;
    this.filtroFases.ativo = true;
    console.log(this.filtroFases);
    this.svc.listar(FaseModel, this.filtroFases).toPromise().then(
      f => {
        if (f.sucesso) {
          if (f.data != null && f.data !== undefined) {
            this.fases = f.data;

            this.fases.forEach( fase => {
              this.pessoa.id = fase.pessoaId;
              this.svc.obter(this.pessoa).toPromise().then(
                pessoa => {
                  fase.pessoa = pessoa.data;
                }
              );
            });

            this.fases.forEach( fase => {
              this.tipoFase.id = fase.tipoFaseId;
              this.svc.obter(this.tipoFase).toPromise().then(
                tipoFase => {
                  fase.tipoFase = tipoFase.data;
                }
              );
            });

            this.fases.forEach( fase => {
              this.projeto.id = fase.projetoId;
              this.svc.obter(this.projeto).toPromise().then(
                projeto => {
                  fase.projeto = projeto.data;
                }
              );
            });

            this.pessoa = new Pessoa();
            this.tipoFase = new TipoFaseModel();
            this.projeto = new Projeto();
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
    this.router.navigate([`template/projetos/novo-projeto/fase/nova-fase/${this.id}`]);
  }

  editar(id: number) {
    this.router.navigate([`/template/projetos/novo-projeto/fase/nova-fase/${this.id}/${id}`]);
  }

  
}
