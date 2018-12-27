import { FechamentoProjetoComponent } from './Home/Projetos/actions/fechamento-projeto/fechamento-projeto.component';
import { NovaChangeComponent } from './Home/Projetos/actions/nova-change/nova-change.component';
import { PessoasComponent } from './Home/Pessoas/pessoas.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelosComponent } from './shared/modelos/modelos.component';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { EsforcoProjetoComponent } from './Home/Projetos/actions/esforco-projeto/esforco-projeto.component';
import { LoginComponent } from './Home/Login/login/login.component';
import { DadosPrincipaisComponent } from './Home/Projetos/actions/novo-projeto/actions/dados-principais/dados-principais.component';
import { ProjetosComponent } from './Home/Projetos/projetos.component';
import { EsqueceuSenhaComponent } from './Home/Login/esqueceu-senha/esqueceu-senha.component';
import { PrimeiroAcessoComponent } from './Home/Login/primeiro-acesso/primeiro-acesso.component';
import { CadastroPessoasComponent } from './Home/Pessoas/actions/cadastro-pessoas/cadastro-pessoas.component';
import { CadastroColaboradoresComponent } from './Home/Pessoas/actions/cadastro-colaboradores/cadastro-colaboradores.component';

const appRoutes: Routes = [
  {
    path: 'modelos',
    component: ModelosComponent
  },
  {
    path: '*',
    component: AppComponent
  },
  {
    path: 'cadastro-colaborador',
    component: CadastroColaboradoresComponent
  },
  {
    path: 'pessoas',
    component: PessoasComponent
  },
  {
    path: 'projetos',
    component: ProjetosComponent
  },
  {
    path: 'template',
    component: TemplateComponent

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'nova-change',
    component: NovaChangeComponent
  },
  {
    path: 'esforco-projeto',
    component: EsforcoProjetoComponent
  },
  {
    path: 'dados-principais',
    component: DadosPrincipaisComponent
  },{
    path: 'esqueci-senha',
    component: EsqueceuSenhaComponent
  },
  {
    path: 'primeiro-acesso',
    component: PrimeiroAcessoComponent
  },
  {
    path: 'cadastro-pessoas',
    component: CadastroPessoasComponent
  },
  {
    path: 'fechamento-projeto',
    component: FechamentoProjetoComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
