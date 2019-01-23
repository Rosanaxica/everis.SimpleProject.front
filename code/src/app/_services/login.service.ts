import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Pessoa } from '../_models/pessoa.model';
import { PessoaColaboradorViewModel } from '../_models/pessoacolaborador.viewmodel';
import { Observable } from 'rxjs/Rx';
import { Colaborador } from '../_models/colaborador.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { GenericService } from './generic.service';
import { ModeloRetorno } from '../_models/interfaces/modelo.retorno';
import { LoaderService } from './loader.service';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private svc: GenericService, private http: HttpClient, private route: Router, private loaderService: LoaderService) { }

    login(obj: Colaborador): Promise<boolean> {
        return this.svc.postViewModel(obj, 'Login/Login')
            .toPromise().then(
                data => {
                    this.loaderService.show();
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('nome', data.nome);
                    localStorage.setItem('id', data.id);
                    this.route.navigate(['/dashboard']).then(() => window.location.reload());
                    return true;
                },
                error => {
                    return false;
                }
            );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('nome');
        localStorage.removeItem('id');
        this.route.navigateByUrl('/login');
    }

    authenticated(): boolean {
        return (localStorage.token);
    }

    get token() {
        return localStorage.token;
    }
}