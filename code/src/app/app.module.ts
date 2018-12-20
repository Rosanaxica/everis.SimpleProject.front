import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TitleComponent } from './shared/title/title.component';
import { PessoasComponent } from './Home/Pessoas/pessoas/pessoas.component';
import { SaveButtonComponent } from './shared/save-button/save-button.component';
import { LoginComponent } from './Home/Login/login/login.component';
import { PrimeiroAcessoComponent } from './Home/Login/primeiro-acesso/primeiro-acesso.component';
import { EsqueceuSenhaComponent } from './Home/Login/esqueceu-senha/esqueceu-senha.component';
import { DashboardComponent } from './Home/Dashboard/dashboard/dashboard.component';
import { NovoProjetoComponent } from './Home/Projetos/novo-projeto/novo-projeto.component';
import { FechamentoProjetoComponent } from './Home/Projetos/fechamento-projeto/fechamento-projeto.component';
import { AnexosComponent } from './Home/Projetos/anexos/anexos.component';
import { EsforcoProjetoComponent } from './Home/Projetos/esforco-projeto/esforco-projeto.component';
import { AtribuicaoEquipeComponent } from './Home/Projetos/atribuicao-equipe/atribuicao-equipe.component';
import { NovaChangeComponent } from './Home/Projetos/nova-change/nova-change.component';
import { CadastroColaboradoresComponent } from './Home/Pessoas/cadastro-colaboradores/cadastro-colaboradores.component';
import { CadastroPessoasComponent } from './Home/Pessoas/cadastro-pessoas/cadastro-pessoas.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    PessoasComponent,
    SaveButtonComponent,
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
    CadastroPessoasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
