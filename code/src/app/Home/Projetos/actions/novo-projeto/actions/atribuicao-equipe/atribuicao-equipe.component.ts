import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atribuicao-equipe',
  templateUrl: './atribuicao-equipe.component.html',
  styleUrls: ['./atribuicao-equipe.component.css']
})
export class AtribuicaoEquipeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cancelar() {
    this.router.navigate(['/template/projetos']);
  }

}
