import { Colaborador } from './../../_models/colaborador.model';
import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { Pessoa } from 'src/app/_models/pessoa.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PessoaColaboradorViewModel } from 'src/app/_models/pessoacolaborador.viewmodel';
import { OrderByPipe } from 'src/app/_custom-pipes/sort-pipe';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  constructor(private arouter: ActivatedRoute, private svc: GenericService, private router: Router) { }

  colaboradores: Colaborador[]
  pessoas: Pessoa[]
  colaborador = new Colaborador();
  statusSelecionados = [
    { id: 1, descricao: 'Disponível', checked: true },
    { id: 2, descricao: 'Indisponível', checked: true },
  ];
  ColaboradorDisponivel: Colaborador[] = [];
  ColaboradorIndisponivel: Colaborador[] = [];
  nomePessoa: string;
  pessoasFiltradas: Pessoa[] = [];
  colaboradoresFiltrados = [];
  pessoaModel = { nome: '' } as Pessoa;
  msgSucesso: string;
  msgErro: string;

  listaPessoaColaborador = new Array<PessoaColaboradorViewModel>();

  ngOnInit() {
    this.filtrar();
    this.arouter.paramMap.subscribe(res => {
      var sucesso = res.get("sucesso");
      var erro = res.get("erro");
      if (sucesso !== null && sucesso !== undefined && sucesso) {
        this.msgSucesso = "Solicitação realizada com com sucesso"
      }

      if (erro !== null && erro !== undefined && erro) {
        this.msgErro = "Ocorreu um erro ao processar a sua solicitação"
      }
      this.svc.listar(Colaborador, null, 'ObterTodos').toPromise().then(c => {
        this.colaboradores = c.data
        this.colaboradores.forEach(element => {
          this.colaboradoresFiltrados.push(element)
        })
      })

    });

  }

  filtroStatus(status) {
    return status;
  }

  mudarStatus(id) {
    this.statusSelecionados.filter(this.filtroStatus).forEach(x => {
      if (x.id == id) {
        x.checked = !(x.checked)
      }
    });
  }

  ListarColaboradorPeloStatusSelecionado() {
    this.statusSelecionados.map(status => status.checked === true);
    if (this.statusSelecionados[0].checked) {
      this.colaboradores.forEach(element => {
        if (element != undefined && element.disponivel == true) {
          this.ColaboradorDisponivel.push(element)

        }
      });
    }
    if (this.statusSelecionados[1].checked) {
      this.colaboradores.forEach(element => {
        if (element != undefined && element.disponivel == false) {
          this.ColaboradorIndisponivel.push(element)

        }
      })
    }
  }

  mostrarStatus(id): boolean {
    return this.statusSelecionados.find(x => x.id == id).checked
  }

  editar(id: number) {
    this.router.navigate([`/pessoas/editar-pessoa/${id}`]);
  }

  ListarPessoas() {
    this.svc.listar(Pessoa).toPromise().then(pessoas => {
      this.pessoas = pessoas['data'];
    })
  }

  filtrar() {
    this.svc.listar(Pessoa, this.pessoaModel, "FiltrarPessoaColaborador").toPromise().then(s => {
      this.listaPessoaColaborador = s.data as Array<PessoaColaboradorViewModel>;
    },
      (error) => {
      });
  }
}
