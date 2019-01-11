import {Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  menuFechado: boolean;
  constructor() { }

  ngOnInit() {
    this.menuFechado = true;
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
