import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PessoasComponent } from './Home/Pessoas/pessoas.component';
import { LoginComponent } from './Home/Login/login/login.component';
import { PrimeiroAcessoComponent } from './Home/Login/primeiro-acesso/primeiro-acesso.component';
import { EsqueceuSenhaComponent } from './Home/Login/esqueceu-senha/esqueceu-senha.component';
import { DashboardComponent } from './Home/Dashboard/dashboard/dashboard.component';
import { NovoProjetoComponent } from './Home/Projetos/actions/novo-projeto/novo-projeto.component';
import { FechamentoProjetoComponent } from './Home/Projetos/actions/fechamento-projeto/fechamento-projeto.component';
import { AnexosComponent } from './Home/Projetos/actions/novo-projeto/actions/anexos/anexos.component';
import { EsforcoProjetoComponent } from './Home/Projetos/actions/esforco-projeto/esforco-projeto.component';
import { AtribuicaoEquipeComponent } from './Home/Projetos/actions/novo-projeto/actions/atribuicao-equipe/atribuicao-equipe.component';
import { NovaChangeComponent } from './Home/Projetos/actions/nova-change/nova-change.component';
import { CadastroColaboradoresComponent } from './Home/Pessoas/actions/cadastro-colaboradores/cadastro-colaboradores.component';
import { CadastroPessoasComponent } from './Home/Pessoas/actions/cadastro-pessoas/cadastro-pessoas.component';
import { ProjetosComponent } from './Home/Projetos/projetos.component';
import { DadosPrincipaisComponent } from './Home/Projetos/actions/novo-projeto/actions/dados-principais/dados-principais.component';
import { SearchComponent } from './shared/search/search.component';
import { CardPeopleComponent } from './shared/card-people/card-people.component';
import { AddTelephoneComponent } from './shared/add-telephone/add-telephone.component';
import { AppRoutingModule } from './app-routing.module';
import { ModelosComponent } from './shared/modelos/modelos.component';
import { CadastroColaboradorComponent } from './cadastro-colaborador/cadastro-colaborador.component';
import { BsDatepickerModule } from 'ngx-bootstrap';

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
    EsforcoProjetoComponent,
    AtribuicaoEquipeComponent,
    NovaChangeComponent,
    CadastroColaboradoresComponent,
    CadastroPessoasComponent,
    ProjetosComponent,
    DadosPrincipaisComponent,
    SearchComponent,
    CardPeopleComponent,
    AddTelephoneComponent,
    ModelosComponent,
    CadastroColaboradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
