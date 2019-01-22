
import { Component } from '@angular/core';
import { Projeto } from 'src/app/_models/projeto.model';
import { Status } from 'src/app/_models/status.model';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})

export class ModelosComponent {
  panelOpenState = false;

  projetos: Projeto[] = [];
  status: Status[] = [];
  statusSelecionados = [
    { id: 1, descricao: 'Em Aprovação', checked: true },
    { id: 2, descricao: 'Em Execução', checked: true },
    { id: 3, descricao: 'Cancelado', checked: true },
    { id: 4, descricao: 'Concluído', checked: true }
  ];
}
