import { AlterarSenhaComponent } from './Home/meus-dados/Alterar-senha/alterar-senha/alterar-senha.component';
import { MeusDadosComponent } from './Home/meus-dados/meus-dados.component';
import { NovaSolicitacaoMudanca } from './Home/Projetos/actions/nova-solicitacao-mudanca/nova-solicitacao-mudanca.component';
import { PessoasComponent } from './Home/Pessoas/pessoas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelosComponent } from './shared/modelos/modelos.component';
import { LoginComponent } from './Home/Login/login/login.component';
import { ProjetosComponent } from './Home/Projetos/projetos.component';
import { EsqueceuSenhaComponent } from './Home/Login/esqueceu-senha/esqueceu-senha.component';
import { PrimeiroAcessoComponent } from './Home/Login/primeiro-acesso/primeiro-acesso.component';
import { CadastroPessoasComponent } from './Home/Pessoas/actions/cadastro-pessoas/cadastro-pessoas.component';
import { NovoProjetoComponent } from './Home/Projetos/actions/novo-projeto/novo-projeto.component';
import { EmpresaComponent } from './Home/Empresas/empresa.component';
import { DashboardComponent } from './Home/Dashboard/dashboard/dashboard.component';
import { MapaSiteComponent } from './Home/mapa-site/mapa-site.component';
import { NovaEmpresaComponent } from './Home/Empresas/nova-empresa/nova-empresa.component';
import { ComunidadesComponent } from './Home/Comunidades/comunidades.component';
import { SolicitacaoMudancaComponent } from './Home/Projetos/actions/solicitacao-mudanca/solicitacao-mudanca.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { CadastroComunidadeComponent } from './Home/Comunidades/cadastro-comunidade/cadastro-comunidade.component';
import { CadastroSquadComponent } from './Home/Comunidades/cadastro-comunidade/squads/cadastro-squad/cadastro-squad.component';
import { NovaFaseComponent } from './Home/Projetos/actions/novo-projeto/actions/fase/actions/nova-fase/nova-fase.component';
import { FaseComponent } from './Home/Projetos/actions/novo-projeto/actions/fase/fase.component';

const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'primeiro-acesso', component: PrimeiroAcessoComponent },
  { path: 'esqueci-senha', component: EsqueceuSenhaComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'mapa-site', component: MapaSiteComponent, canActivate: [AuthGuard] },
  { path: 'modelos', component: ModelosComponent, canActivate: [AuthGuard] },

  { path: 'meus-dados', component: MeusDadosComponent, canActivate: [AuthGuard] },
  { path: 'alterar-senha', component: AlterarSenhaComponent, canActivate: [AuthGuard] },

  { path: 'empresas', component: EmpresaComponent, canActivate: [AuthGuard] },
  { path: 'empresas/incluir-empresa', component: NovaEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'empresas/editar-empresa/:id', component: NovaEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'empresas:sucesso', component: EmpresaComponent, canActivate: [AuthGuard] },

  { path: 'projetos', component: ProjetosComponent, canActivate: [AuthGuard] },
  { path: 'projetos/novo-projeto', component: NovoProjetoComponent, canActivate: [AuthGuard] },
  { path: 'projetos/novo-projeto/:id', component: NovoProjetoComponent, canActivate: [AuthGuard] },
  { path: 'projetos:sucesso', component: PessoasComponent, canActivate: [AuthGuard] },


  { path: 'projetos/novo-projeto/solicitacao-mudanca/:id', component: SolicitacaoMudancaComponent, canActivate: [AuthGuard] },
  { path: 'projetos/novo-projeto/solicitacao-mudanca/nova-solicitacao-mudanca/:id', component: NovaSolicitacaoMudanca, canActivate: [AuthGuard] },
  { path: 'projetos/novo-projeto/solicitacao-mudanca/nova-solicitacao-mudanca/:id/:id2', component: NovaSolicitacaoMudanca, canActivate: [AuthGuard] },


  { path: 'projetos/novo-projeto/fase/:idProjeto', component: FaseComponent, canActivate: [AuthGuard] },
  { path: 'projetos/novo-projeto/fase/nova-fase/:idProjeto', component: NovaFaseComponent, canActivate: [AuthGuard] },
  { path: 'projetos/novo-projeto/fase/nova-fase/:idProjeto/:idFase', component: NovaFaseComponent, canActivate: [AuthGuard] },

  { path: 'pessoas', component: PessoasComponent, canActivate: [AuthGuard] },
  { path: 'pessoas/cadastro-pessoas', component: CadastroPessoasComponent, canActivate: [AuthGuard] },
  { path: 'pessoas/editar-pessoa/:id', component: CadastroPessoasComponent, canActivate: [AuthGuard] },
  { path: 'pessoas:sucesso', component: PessoasComponent, canActivate: [AuthGuard] },
  { path: 'pessoas:erro', component: PessoasComponent, canActivate: [AuthGuard] },


  { path: 'comunidades', component: ComunidadesComponent, canActivate: [AuthGuard] },
  { path: 'comunidades/incluir-comunidade', component: CadastroComunidadeComponent, canActivate: [AuthGuard] },
  { path: 'comunidades/editar-comunidade/:id', component: CadastroComunidadeComponent, canActivate: [AuthGuard] },
  { path: 'comunidades:sucesso', component: EmpresaComponent, canActivate: [AuthGuard] },

  { path: 'squads/incluir-squad/:comunidadeid', component: CadastroSquadComponent, canActivate: [AuthGuard] },
  { path: 'squads/editar-squad/:comunidadeid/:id', component: CadastroSquadComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
