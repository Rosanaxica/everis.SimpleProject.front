import { PessoasComponent } from './Home/Pessoas/pessoas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelosComponent } from './shared/modelos/modelos.component';
import { AppComponent } from './app.component';
import { CadastroColaboradorComponent } from './Home/cadastro-colaborador/cadastro-colaborador.component';
import { TemplateComponent } from './template/template.component';
import { EsforcoProjetoComponent } from './Home/Projetos/actions/esforco-projeto/esforco-projeto.component';
import { LoginComponent } from './Home/Login/login/login.component';
import { AnexosComponent } from './Home/Projetos/actions/novo-projeto/actions/anexos/anexos.component';

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
    component: CadastroColaboradorComponent
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
  },
  {
    path: 'anexos',
    component: AnexosComponent
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
