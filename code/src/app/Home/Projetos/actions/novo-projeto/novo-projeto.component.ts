import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.css']
})
export class NovoProjetoComponent implements OnInit {

  constructor(private router: Router, private arouter: ActivatedRoute) { }

  id: number;

  ngOnInit() {
    this.arouter.paramMap.subscribe(res => {
      this.id = +res.get('id');
    });
  }

  cancelar() {
    this.router.navigate(['/template/projetos']);
  }

  novaChange() {
    this.router.navigate([`template/projetos/novo-projeto/changes/${this.id}`]);
  }


}
