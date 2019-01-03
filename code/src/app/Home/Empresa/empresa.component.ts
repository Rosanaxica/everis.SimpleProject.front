import { Component, OnInit, ErrorHandler } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Empresa } from 'src/app/_models/empresa.model';
import { EmpresaService } from 'src/app/_services/empresa-service.service';
// import 'rxjs/operator/map';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  ngOnInit() {
  }
  constructor() { }
}
