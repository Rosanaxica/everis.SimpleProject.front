import { PessoasComponent } from './Home/Pessoas/pessoas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelosComponent } from './shared/modelos/modelos.component';
import { AppComponent } from './app.component';
import { EsforcoProjetoComponent } from './Home/Projetos/actions/esforco-projeto/esforco-projeto.component';

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
     path: 'pessoas',
     component: PessoasComponent
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
