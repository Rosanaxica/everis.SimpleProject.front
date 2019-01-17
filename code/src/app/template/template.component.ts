import {Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  menuFechado: boolean;
  constructor(private svc: LoginService) { }

  ngOnInit() {
    this.menuFechado = true;
  }

  logout(){
    this.svc.logout();
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
