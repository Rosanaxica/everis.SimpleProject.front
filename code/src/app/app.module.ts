import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject, Injector } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DatePipe } from '@angular/common';


import { LoginComponent } from './Home/Login/login/login.component';
import { PrimeiroAcessoComponent } from './Home/Login/primeiro-acesso/primeiro-acesso.component';
import { EsqueceuSenhaComponent } from './Home/Login/esqueceu-senha/esqueceu-senha.component';
import { DashboardComponent } from './Home/Dashboard/dashboard/dashboard.component';
import { NovoProjetoComponent } from './Home/Projetos/actions/novo-projeto/novo-projeto.component';
import { FechamentoProjetoComponent } from './Home/Projetos/actions/fechamento-projeto/fechamento-projeto.component';
import { AnexosComponent } from './Home/Projetos/actions/novo-projeto/actions/anexos/anexos.component';
import { AtribuicaoEquipeComponent } from './Home/Projetos/actions/novo-projeto/actions/atribuicao-equipe/atribuicao-equipe.component';
import { NovaSolicitacaoMudanca } from './Home/Projetos/actions/nova-solicitacao-mudanca/nova-solicitacao-mudanca.component';
import { CadastroPessoasComponent } from './Home/Pessoas/actions/cadastro-pessoas/cadastro-pessoas.component';
import { ProjetosComponent } from './Home/Projetos/projetos.component';
import { DadosPrincipaisComponent } from './Home/Projetos/actions/novo-projeto/actions/dados-principais/dados-principais.component';
import { AddTelephoneComponent } from './shared/add-telephone/add-telephone.component';
import { AppRoutingModule } from './app-routing.module';
import { ModelosComponent } from './shared/modelos/modelos.component';
import { EmpresaComponent } from './Home/Empresas/empresa.component';

import { HttpModule } from '@angular/http';
import { BsDatepickerModule } from 'ngx-bootstrap';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatTooltipModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { UploadComponent } from './shared/upload/upload.component';
import { DateFormatPipe } from './shared/util/date-format-pipe';
import { DateTimeFormatPipe } from './shared/util/datetime-format-pipe';

import { MapaSiteComponent } from './Home/mapa-site/mapa-site.component';
import { NovaEmpresaComponent } from './Home/Empresas/nova-empresa/nova-empresa.component';
import { LoaderComponent } from './core/loader/loader.component';

import { GenericService } from './_services/generic.service';
import { HttpService } from './_services/http.service';
import { LoaderService } from './_services/loader.service';



import { PessoasComponent } from './Home/Pessoas/pessoas.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
  
import { GraficopizzaComponent } from './Home/Dashboard/graficopizza/graficopizza.component';
import { SolicitacaoMudancaComponent } from './Home/Projetos/actions/solicitacao-mudanca/solicitacao-mudanca.component';
import { AlterarSenhaComponent } from './Home/meus-dados/Alterar-senha/alterar-senha/alterar-senha.component';
import { MeusDadosComponent } from './Home/meus-dados/meus-dados.component';
import { ComunidadesComponent } from './Home/Comunidades/comunidades.component';
import { GraficolinhaComponent } from './Home/Dashboard/graficolinha/graficolinha.component';
import { FaseComponent } from './Home/Projetos/actions/novo-projeto/actions/fase/fase.component';
import { NovaFaseComponent } from './Home/Projetos/actions/novo-projeto/actions/fase/actions/nova-fase/nova-fase.component';
import { CadastroComunidadeComponent } from './Home/Comunidades/cadastro-comunidade/cadastro-comunidade.component';
import { SquadsComponent } from './Home/Comunidades/cadastro-comunidade/squads/squads.component';
import { CadastroSquadComponent } from './Home/Comunidades/cadastro-comunidade/squads/cadastro-squad/cadastro-squad.component';


@NgModule({
  declarations: [
    AppComponent,
    PessoasComponent,
    LoginComponent,
    PrimeiroAcessoComponent,
    EsqueceuSenhaComponent,
    DashboardComponent,
    NovoProjetoComponent,
    FechamentoProjetoComponent,
    AnexosComponent,
    FaseComponent,
    AtribuicaoEquipeComponent,
    NovaSolicitacaoMudanca,
    CadastroPessoasComponent,
    ProjetosComponent,
    DadosPrincipaisComponent,
    AddTelephoneComponent,
    ModelosComponent,
    EmpresaComponent,
    AnexosComponent,
    UploadComponent,
    DateFormatPipe,
    DateTimeFormatPipe,
    SolicitacaoMudancaComponent,
    NovaFaseComponent,
    MapaSiteComponent,
    NovaEmpresaComponent,
    LoaderComponent,
    GraficopizzaComponent,
    AlterarSenhaComponent,
    MeusDadosComponent,
    ComunidadesComponent,
    CadastroComunidadeComponent,
<<<<<<< HEAD
    GraficolinhaComponent
=======
    GraficolinhaComponent,
    SquadsComponent,
    CadastroSquadComponent
>>>>>>> 78089ef704a7dace4f0302fa5d62d7c09da47984
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    ChartModule,
    MatTooltipModule

  ],
  providers: [
    GenericService,
    HttpService,
    LoaderService,
    DatePipe
    // {provide: HIGHCHARTS_MODULES,useFactory: () => [more, exportData, exporting, offlineExporting]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  static injector: Injector;
  constructor(public injector: Injector) { }
}
