import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TitleComponent } from './shared/title/title.component';
import { PessoasComponent } from './Pessoas/pessoas/pessoas.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    PessoasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
