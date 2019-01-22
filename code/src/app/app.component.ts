import { Component, OnInit } from '@angular/core';
import { LoginService } from './_services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  menuFechado: boolean;
  constructor(private svc: LoginService) { }

  ngOnInit() {
    this.menuFechado = true;
  }

  logout(){
    this.svc.logout();
  }

  isLoggedIn(){
    return this.svc.authenticated();
    }

  ToggleMenu() {

    if (this.menuFechado === true)
    {
      this.menuFechado = false;
  }
    else
    {
      this.menuFechado = true;
    }
  }
}
