import { AlterarSenhaComponent } from './Home/meus-dados/Alterar-senha/alterar-senha/alterar-senha.component';
import { MeusDadosComponent } from './Home/meus-dados/meus-dados.component';
import { AtribuicaoEquipeComponent } from './Home/Projetos/actions/novo-projeto/actions/atribuicao-equipe/atribuicao-equipe.component';
import { FechamentoProjetoComponent } from './Home/Projetos/actions/fechamento-projeto/fechamento-projeto.component';
import { NovaSolicitacaoMudanca } from './Home/Projetos/actions/nova-solicitacao-mudanca/nova-solicitacao-mudanca.component';
import { PessoasComponent } from './Home/Pessoas/pessoas.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelosComponent } from './shared/modelos/modelos.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './Home/Login/login/login.component';
import { DadosPrincipaisComponent } from './Home/Projetos/actions/novo-projeto/actions/dados-principais/dados-principais.component';
import { ProjetosComponent } from './Home/Projetos/projetos.component';
import { EsqueceuSenhaComponent } from './Home/Login/esqueceu-senha/esqueceu-senha.component';
import { PrimeiroAcessoComponent } from './Home/Login/primeiro-acesso/primeiro-acesso.component';
import { CadastroPessoasComponent } from './Home/Pessoas/actions/cadastro-pessoas/cadastro-pessoas.component';
import { NovoProjetoComponent } from './Home/Projetos/actions/novo-projeto/novo-projeto.component';
import { AnexosComponent } from './Home/Projetos/actions/novo-projeto/actions/anexos/anexos.component';
import { EmpresaComponent } from './Home/Empresas/empresa.component';
import { DashboardComponent } from './Home/Dashboard/dashboard/dashboard.component';
import { MapaSiteComponent } from './Home/mapa-site/mapa-site.component';
import { NovaEmpresaComponent } from './Home/Empresas/nova-empresa/nova-empresa.component';
import { LoaderComponent } from './core/loader/loader.component';
import { ComunidadesComponent } from './Home/Comunidades/comunidades/comunidades.component';
import { SolicitacaoMudancaComponent } from './Home/Projetos/actions/solicitacao-mudanca/solicitacao-mudanca.component';
import { AuthGuard } from './shared/guard/auth.guard';

const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'primeiro-acesso', component: PrimeiroAcessoComponent },
  { path: 'esqueci-senha', component: EsqueceuSenhaComponent },
  
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'mapa-site', component: MapaSiteComponent, canActivate: [AuthGuard] },
  { path: 'modelos', component: ModelosComponent, canActivate: [AuthGuard] },

  { path: 'meus-dados', component: MeusDadosComponent, canActivate: [AuthGuard] },
  { path: 'alterar-senha', component: AlterarSenhaComponent, canActivate: [AuthGuard] },

  { path: 'empresas', component: EmpresaComponent, canActivate: [AuthGuard]},
  { path: 'empresas/incluir-empresa', component: NovaEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'empresas/editar-empresa/:id', component: NovaEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'empresas:sucesso', component: EmpresaComponent, canActivate: [AuthGuard] },

  { path: 'projetos', component: ProjetosComponent, canActivate: [AuthGuard]},
  { path: 'projetos/novo-projeto', component: NovoProjetoComponent, canActivate: [AuthGuard]},
  
  { path: 'pessoas', component: PessoasComponent, canActivate: [AuthGuard]},
  { path: 'pessoas/cadastro-pessoas', component: CadastroPessoasComponent, canActivate: [AuthGuard]},
  
  { path: 'comunidades', component: ComunidadesComponent, canActivate: [AuthGuard]},

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
