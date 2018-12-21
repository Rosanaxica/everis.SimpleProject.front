import { PessoasComponent } from './Home/Pessoas/pessoas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelosComponent } from './shared/modelos/modelos.component';
import { AppComponent } from './app.component';
import { CadastroColaboradorComponent } from './cadastro-colaborador/cadastro-colaborador.component';
import { TemplateComponent } from './template/template.component';

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
