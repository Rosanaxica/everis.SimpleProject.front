import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/_services/generic.service';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Projeto } from 'src/app/_models/projeto.model';
import { Status } from 'src/app/_models/status.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NovoProjetoComponent } from './actions/novo-projeto/novo-projeto.component';
import { ProjetoPessoa } from 'src/app/_models/projetopessoa.model';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { ProjetoSquad } from 'src/app/_models/projeto-squad.model';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {
  title = 'Projetos';
  totalProjetos: number;
  projetos: any;
  pessoas: any;
  projetoSquad = new ProjetoSquad();
  filtroProjetoSquad = new ProjetoSquad();
  projetoPessoa: ProjetoPessoa[] = [];
  filtroProjetoPessoa = new ProjetoPessoa();
  status: Status[] = [];
  statusSelecionados = [
    { id: 1, descricao: 'Em desenvolvimento', checked: true },
    { id: 2, descricao: 'Aguardando aprovação', checked: true },
    { id: 3, descricao: 'Concluído', checked: true },
    { id: 4, descricao: 'Entregue', checked: true },
    { id: 5, descricao: 'Aguardando abertura', checked: true },
    { id: 6, descricao: 'Cancelado', checked: true },
    { id: 7, descricao: 'Proposta', checked: true }
  ];;
  filtroProjeto = new Projeto();
  codigoProjeto: string;
  projetoId: number;
  projetosFiltrados: Array<Projeto>;
  exibeMsg: boolean;
  form: FormGroup;
  msgSucesso: string;
  hasSquad: boolean;

  constructor(private router: Router, private svc: GenericService, private fb: FormBuilder, private arouter: ActivatedRoute) { }

  ngOnInit() {
    this.filtrar();
    this.Persitencia();
    this.arouter.paramMap.subscribe(res => {
      var sucesso = res.get("sucesso");

      if (sucesso !== null && sucesso !== undefined && sucesso) {
        this.msgSucesso = "Solicitação realizada com com sucesso"
      }
    });


  }

  mudarStatus(id) {
    this.statusSelecionados.find(x => x.id == id).checked = !(this.statusSelecionados.find(x => x.id == id).checked)
    this.contar(this.projetosFiltrados);
  }

  Persitencia(){
    this.filtrar()
  }

  mostrarStatus(id): boolean {
    return this.statusSelecionados.find(x => x.id == id).checked
  }

  mostrarProjetosFiltrados(codigo: string) {
    if (this.codigoProjeto == '' || this.codigoProjeto == null) {
      this.projetosFiltrados = this.projetos;
      this.exibeMsg = false;
    }
    else if (this.projetos.filter(p => p.codigoProjeto == codigo) == '') {
      this.projetosFiltrados = [];
      this.exibeMsg = true;
    }
    else {
      this.projetosFiltrados = this.projetos.filter(p => p.codigoProjeto == codigo);
      this.exibeMsg = false;
    }
    this.contar(this.projetosFiltrados);
  }

  detalheProjeto(projeto: Projeto): void {
    this.router.navigate([`/projetos/novo-projeto/${projeto.id}`]);
  }

  // exibirEquipe(projetoId: number) {

  //   this.filtroProjetoSquad.projetoId = projetoId > 0 ? projetoId : 0;
  //   this.svc.listar(ProjetoSquad, this.filtroProjetoSquad, "ObterProjetoSquad").toPromise().then(
  //     s => {
  //       if (s.sucesso) {
  //         if (s.data != null && s.data !== undefined) {
  //           this.projetoSquad = s.data;
  //           this.hasSquad = true;
  //         }
  //       } else {
  //         this.projetoSquad = new ProjetoSquad();
  //         this.hasSquad = false;
  //       }
  //     }
  //   );


  //   this.filtroProjetoPessoa.projetoId = projetoId;
  //   this.svc.listar(ProjetoPessoa, this.filtroProjetoPessoa).toPromise().then(
  //     s => {
  //       if (s.sucesso) {
  //         if (s.data != null && s.data !== undefined) {
  //           this.projetoPessoa = s.data;
  //         }
  //       }
  //     }
  //   );
  // }

  contar(lista: Array<Projeto>) {
    let cont = 0;
    lista.forEach(element => {
      if (this.mostrarStatus(element.status.id))
        cont++;
    });
    this.totalProjetos = cont;
  }

  filtrar() {
    this.filtroProjeto.ativo = true;

    this.svc.listar(Projeto, this.filtroProjeto).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.projetos = s.data;
            this.contar(this.projetos);
            this.projetosFiltrados = this.projetos;
            this.contar(this.projetosFiltrados);
            this.vincularProjetoPessoas();
          }
        }
      }
    );
    this.svc.listar(Pessoa)
      .toPromise().then(
        (result) => {
          this.pessoas = result['data'];
        },
        (error) => {
        }
      );
    this.svc.listar(Status).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.status = s.data;
          }
        }
      }
    );

    this.svc.listar(ProjetoSquad, this.filtroProjetoSquad, "ObterProjetoSquad").toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.projetoSquad = s.data;
            this.hasSquad = true;
          }
        } else {
          this.projetoSquad = new ProjetoSquad();
          this.hasSquad = false;
        }
      }
    );
  }
  vincularProjetoPessoas() {
    // this.projetos.forEach(projeto => {
    //   this.projetoPessoa.forEach(projPessoa => {
    //     if (projeto.id == projPessoa.projetoId) {
    //       projeto.projetoPessoas.push(projPessoa);
    //     }
    //   });
    // });
    this.projetos.forEach(projeto => {
      this.filtroProjetoPessoa.projetoId = projeto.id;
      this.svc.listar(ProjetoPessoa, this.filtroProjetoPessoa).toPromise().then(
        s => {
          if (s.sucesso) {
            if (s.data != null && s.data !== undefined) {
              this.projetoPessoa = s.data;
              projeto.projetoPessoas = this.projetoPessoa;
              // this.vincularProjetoPessoas();
            }
          }
        }
      );
    });
  }
}
