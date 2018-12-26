import { PessoasComponent } from './Home/Pessoas/pessoas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelosComponent } from './shared/modelos/modelos.component';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { EsforcoProjetoComponent } from './Home/Projetos/actions/esforco-projeto/esforco-projeto.component';
import { LoginComponent } from './Home/Login/login/login.component';
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
    path: 'template',
    component: TemplateComponent

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'esforco-projeto',
    component: EsforcoProjetoComponent
  }
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
