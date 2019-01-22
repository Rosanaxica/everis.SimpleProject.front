import { element } from 'protractor';
import { Colaborador } from './../../_models/colaborador.model';
import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { filter } from 'rxjs-compat/operator/filter';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  constructor(private svc: GenericService) { }

  colaboradores: Colaborador[] = [];
  pessoas: Pessoa[] = [];
  colaborador = new Colaborador();
  statusSelecionados = [
    { id: 1, descricao: 'Disponível', checked: true },
    { id: 2, descricao: 'Indisponível', checked: true },
  ];

  ngOnInit() {
    this.ListarColaboradoresDasPessoasListadas();
    this.ListarPessoas()
    // console.log(this.statusSelecionados)
  }

  // Quando listar, verificar primeiramente o status selecionado para depois listar
  filtroStatus(status) {
    return status;
  }

  mudarStatus(id) {
    this.statusSelecionados.filter(this.filtroStatus).forEach(x => {
      if (x.id == id) {
        x.checked = !(x.checked)
      }
    });
    console.log(this.statusSelecionados)
  }

  mostrarStatus(id): boolean {
    return this.statusSelecionados.find(x => x.id == id).checked
  }


  // listarPessoasQuePossuemColaborador() {
  //   this.svc.listar(Pessoa).toPromise().then(pessoas => {
  //     this.pessoas = pessoas['data'];
  //     this.pessoas.forEach(element => {
  //       this.svc.obter(this.colaborador, `${element.colaboradorId}`).toPromise().then(colaborador => {
  //         this.colaborador = colaborador['data'];
  //         element.colaborador = this.colaborador;
  //       });
  //     });
  //   },
  //     (error) => {
  //     });
  //   this.svc.listar(Colaborador).toPromise().then(
  //     s => {
  //       console.log("oi, eu sou o Gohan")
  //       if (s.sucesso) {
  //         console.log(s)
  //         if (s.data != null && s.data !== undefined) {
  //           this.statusSelecionados = s.data;
  //           console.log("oi, eu sou o goku")
  //         }
  //       }
  //     }
  //   );
  // }

  ListarPessoas() {
    this.svc.listar(Pessoa).toPromise().then(pessoas => {
      this.pessoas = pessoas['data'];
      this.ListarColaboradoresDasPessoasListadas()
    })
  }

  ListarColaboradoresDasPessoasListadas() {
    this.pessoas.forEach(element => {
      this.svc.obter(this.colaborador, `${element.colaboradorId}`).toPromise().then(colaborador => {
        this.colaborador = colaborador['data'];
        element.colaborador = this.colaborador;
      });
    });
  }
}
