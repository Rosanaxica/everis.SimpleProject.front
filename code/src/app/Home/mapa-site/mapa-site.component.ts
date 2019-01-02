import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa-site',
  templateUrl: './mapa-site.component.html',
  styleUrls: ['./mapa-site.component.css']
})
export class MapaSiteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Cancelar() {
    this.router.navigate(['/template']);
  }
}
