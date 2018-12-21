import { PessoasComponent } from './Home/Pessoas/pessoas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelosComponent } from './shared/modelos/modelos.component';
import { AppComponent } from './app.component';

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
