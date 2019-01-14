import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atribuicao-equipe',
  templateUrl: './atribuicao-equipe.component.html',
  styleUrls: ['./atribuicao-equipe.component.css']
})
export class AtribuicaoEquipeComponent implements OnInit {

  constructor(private router: Router) { }
  @Output() getProjeto = new EventEmitter<string>();
  nomeProjeto: string;
  
  ngOnInit() {
  }

  OpenView(nomeProjeto: string){
    this.nomeProjeto = nomeProjeto;
  }
  cancelar() {
    this.router.navigate(['/template/projetos']);
  }

  salvar(){
    this.getProjeto.emit("2");
  }

}
