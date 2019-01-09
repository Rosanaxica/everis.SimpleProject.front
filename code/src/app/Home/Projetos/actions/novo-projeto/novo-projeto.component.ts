import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/_services/generic.service';
import { EsforcoProjetoModel } from 'src/app/_models/esforcoprojeto.model';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.css']
})
export class NovoProjetoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cancelar() {
    this.router.navigate(['/template/projetos']);
  }
}
