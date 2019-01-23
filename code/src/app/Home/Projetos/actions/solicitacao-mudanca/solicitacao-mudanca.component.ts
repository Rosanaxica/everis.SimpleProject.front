import { Component, OnInit } from '@angular/core';
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
  soma: number;
  resultado: number;

  res: number = 0;

  servico1: number = 0;
  servico2: number = 0;
  servico3: number = 0;


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

  vaiParaNovaSolicitacaoMudanca() {
    this.router.navigate([`projetos/novo-projeto/solicitacao-mudanca/nova-solicitacao-mudanca/${this.id}`]);
  }

  editar(id: number) {
    this.router.navigate([`/projetos/novo-projeto/solicitacao-mudanca/nova-solicitacao-mudanca/${this.id}/${id}`]);
  }

  filtrar() {
    this.filtroSolicitacaoMudanca.projetoId = this.id;
    this.filtroSolicitacaoMudanca.ativo = true;
    this.svc.listar(SolicitacaoMudanca, this.filtroSolicitacaoMudanca).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.solicitacaoMudancas = s.data;
            this.res = 0;

            this.solicitacaoMudancas.forEach(element => {
              this.servico1 += element.qtdHorasServico1;
              this.servico2 += element.qtdHorasServico2;
              this.servico3 += element.qtdHorasServico3;
            });
          }
        }
      }
    );
  }


}
