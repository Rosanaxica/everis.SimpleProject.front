import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent implements OnInit {

  constructor(private router: Router, private arouter: ActivatedRoute) { }

  id: number;

  ngOnInit() {
    this.arouter.paramMap.subscribe(res => {
      this.id = +res.get('id');
    });
  }

  NovaChange() {
    this.router.navigate([`template/projetos/novo-projeto/changes/${this.id}/nova-change/${this.id}`]);
  }

}
