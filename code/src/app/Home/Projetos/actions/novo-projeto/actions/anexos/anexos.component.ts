import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Anexo } from 'src/app/_models/anexo.model';
import { GenericService } from 'src/app/_services/generic.service';

@Component({
  selector: 'app-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.css']
})

export class AnexosComponent implements OnInit {

  anexo = new Anexo();
  nomeProjeto: string;

  constructor(private formBuilder: FormBuilder, private svc: GenericService) { }
  anexoForm: FormGroup;

  ngOnInit() {

  }
  OpenView(nomeProjeto: string){
    this.nomeProjeto = nomeProjeto;
  }
  Adicionar() {
    this.anexo.idProjeto = 1;

    this.svc.salvar(this.anexo, Anexo)
      .toPromise().then((data: any) => {
        switch (data.codigo) {
          case 200:
            window.alert('ok');
            break;
          default:
            window.alert('erro');
            break;
        }
      },
        error => {
          alert('Erro ao tentar adicionar.');
        });
  }
}
