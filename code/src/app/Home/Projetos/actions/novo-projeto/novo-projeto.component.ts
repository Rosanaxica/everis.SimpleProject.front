import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DadosPrincipaisComponent } from './actions/dados-principais/dados-principais.component';
import { TabsetComponent } from 'ngx-bootstrap';
import { AtribuicaoEquipeComponent } from './actions/atribuicao-equipe/atribuicao-equipe.component';
import { AnexosComponent } from './actions/anexos/anexos.component';
import { GenericService } from 'src/app/_services/generic.service';
import { SolicitacaoMudanca } from 'src/app/_models/solicitacao_mudanca.model';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.css']
})
export class NovoProjetoComponent implements OnInit {

  @ViewChild(DadosPrincipaisComponent) formDados: DadosPrincipaisComponent;
  @ViewChild(AtribuicaoEquipeComponent) formAtribuicaoEquipe: AtribuicaoEquipeComponent;
  @ViewChild(AnexosComponent) formAnexo: AnexosComponent;
  @ViewChild('alterarTabs') alterarTabs: TabsetComponent;


  constructor(private router: Router, private arouter: ActivatedRoute, private svc: GenericService) { }

  id: number;
  solicitacaoMudancas: Array<SolicitacaoMudanca>;
  filtroSolicitacaoMudanca = new SolicitacaoMudanca();
  totalSolicitacaoMudancas: number;

  ngOnInit() {
    this.arouter.paramMap.subscribe(res => {
      this.id = +res.get('id');
    });

    this.filtroSolicitacaoMudanca.projetoId = this.id;
    this.filtroSolicitacaoMudanca.ativo = true;
    this.svc.listar(SolicitacaoMudanca, this.filtroSolicitacaoMudanca)
      .toPromise().then(
        (result) => {
          this.solicitacaoMudancas = result.data;
          this.totalSolicitacaoMudancas = this.solicitacaoMudancas.length;
        }
      );
  }

  cancelar() {
    this.router.navigate(['/template/projetos']);
  }
  Adicionar() {
    this.formDados.Adicionar();
    this.selectTab(1);
  }
  selectTab(tabId: number) {
    if (tabId == 1) {
      this.formAtribuicaoEquipe.OpenView("teste")
    } else if (tabId == 2) {
      this.formAnexo.OpenView("teste")
    }
    this.alterarTabs.tabs[tabId].active = true;
  }

  novaSolicitacaoMudanca() {
    this.router.navigate([`template/projetos/novo-projeto/solicitacao-mudanca/${this.id}`]);
  }

  vaiParaFase() {
    this.router.navigate([`template/projetos/novo-projeto/fase/${this.id}`]);
  }
}
