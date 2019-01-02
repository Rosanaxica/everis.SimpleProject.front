import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { urlDataDomain } from '../app.api';
import { Pessoa } from '../_models/pessoa.model';
import { PessoaColaboradorViewModel } from '../_models/pessoacolaborador.viewmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }


  ObterTodosColaboradores() {
    return this.http.get(`${urlDataDomain}api/Colaborador/ObterTodos`);
  }

  ObterTodasPessoas() {
    return this.http.get(`${urlDataDomain}api/Pessoa/ObterTodos`);
  }

  AdicionarColaborador(obj: PessoaColaboradorViewModel) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<PessoaColaboradorViewModel>(`${urlDataDomain}api/Pessoa/CriarPessoaColaborador`, obj, options);
  }

  AdicionarTerceiro(obj: Pessoa): Observable<Pessoa> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<Pessoa>(`${urlDataDomain}api/Pessoa/Adicionar`, obj, options);
  }
}
