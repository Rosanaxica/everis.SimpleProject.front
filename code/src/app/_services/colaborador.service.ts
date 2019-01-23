import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GenericService } from './generic.service';

@Injectable({
    providedIn: 'root'
})

export class ColaboradorService {
    constructor(private svc: GenericService, private http: HttpClient, private route: Router) { }
    email: string = localStorage.getItem('email');

    DadosColaborador(email: string){
        return this.svc.postViewModel(email, 'Colaborador/ListarDadosColaborador')
            .toPromise().then(
                data => { data }
            );
    }

}