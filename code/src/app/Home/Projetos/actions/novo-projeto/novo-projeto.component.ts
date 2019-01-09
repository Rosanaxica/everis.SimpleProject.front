import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DadosPrincipaisComponent } from './actions/dados-principais/dados-principais.component';
import { TabsetComponent } from 'ngx-bootstrap';
import { AtribuicaoEquipeComponent } from './actions/atribuicao-equipe/atribuicao-equipe.component';
import { AnexosComponent } from './actions/anexos/anexos.component';

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
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  cancelar() {
    this.router.navigate(['/template/projetos']);
  }
  Adicionar(){
    this.formDados.Adicionar();
    this.selectTab(1);
  }
  selectTab(tabId: number) {
    if(tabId == 1){
      this.formAtribuicaoEquipe.OpenView("teste")
    }else if(tabId == 2){
      this.formAnexo.OpenView("teste")
    }
    this.alterarTabs.tabs[tabId].active = true;
  }
}
