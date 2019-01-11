import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GenericService } from 'src/app/_services/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacaoMudanca } from 'src/app/_models/solicitacao_mudanca.model';

@Component({
  selector: 'app-solicitacao-mudanca',
  templateUrl: './solicitacao-mudanca.component.html',
  styleUrls: ['./solicitacao-mudanca.component.css']
})
export class SolicitacaoMudancaComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router, private arouter: ActivatedRoute) { }

  solicitacaoMudancas: SolicitacaoMudanca[] = [];
  filtroSolicitacaoMudanca = new SolicitacaoMudanca();
  id: number;
  msgSucesso: string;

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

  editar(id: number) {
    this.router.navigate([`/template/projetos/novo-projeto/solicitacao-mudanca/nova-solicitacao-mudanca/${this.id}/${id}`]);
  }

  desativar(id: number) {
    this.svc.desativar(SolicitacaoMudanca, id).toPromise().then(
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

  novaSolicitacaoMudanca() {
    this.router.navigate([`template/projetos/novo-projeto/solicitacao-mudanca/nova-solicitacao-mudanca/${this.id}`]);
  }

  filtrar() {
    this.filtroSolicitacaoMudanca.projetoId = this.id;
    this.filtroSolicitacaoMudanca.ativo = true;
    this.svc.listar(SolicitacaoMudanca, this.filtroSolicitacaoMudanca).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.solicitacaoMudancas = s.data;
          }
        }
      }
    );
  }
}
