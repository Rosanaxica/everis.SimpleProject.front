import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TitleComponent } from './shared/title/title.component';
import { SaveButtonComponent } from './shared/save-button/save-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    SaveButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
