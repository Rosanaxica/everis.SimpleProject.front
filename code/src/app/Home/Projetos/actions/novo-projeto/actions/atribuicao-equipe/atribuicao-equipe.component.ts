import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Projeto } from '../../../../../../_models/projeto.model';
import { ProjetoPessoa } from '../../../../../../_models/projetopessoa.model';
import { Pessoa } from '../../../../../../_models/pessoa.model';
import { Empresa } from '../../../../../../_models/empresa.model';
import { GenericService } from '../../../../../../_services/generic.service';

@Component({
  selector: 'app-atribuicao-equipe',
  templateUrl: './atribuicao-equipe.component.html',
  styleUrls: ['./atribuicao-equipe.component.css']
})
export class AtribuicaoEquipeComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router) { }
  @Output() getProjeto = new EventEmitter<string>();
  nomeProjeto: string;
  filtroPessoa = new Pessoa();
  projetoPessoa: ProjetoPessoa[] = [];
  pessoas: Pessoa[] = [];
  projeto = new Projeto();

  ngOnInit() {
  }

  OpenView(projeto: Projeto) {
    this.nomeProjeto = projeto.nome;
    this.projeto = projeto;
  }
  cancelar() {
    this.router.navigate(['/template/projetos']);
  }

  salvar() {
    //this.getProjeto.emit("2");
  }
  buscaEmpresa(idEmpresa: number): string {
    let empresaModel: Empresa;
    empresaModel.id = idEmpresa;

    this.svc.obter(empresaModel).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            empresaModel = s.data;
          }
        }
      }
    );
    return empresaModel.nome;
  }
  filtrar() {
    this.filtroPessoa.ativo = true;
    this.svc.listar(Pessoa, this.filtroPessoa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.pessoas = s.data;
          }
        }
      }
    );
  }
  Adicionar(pessoa: Pessoa) {
    let projPessoa = new ProjetoPessoa();
    projPessoa.pessoaId = pessoa.id;
    projPessoa.pessoa = pessoa;
    projPessoa.projetoId = this.projeto.id;
    projPessoa.projeto = this.projeto;
    this.projetoPessoa.push(projPessoa);
  }

}
