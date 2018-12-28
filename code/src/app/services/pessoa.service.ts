import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { urlDataDomain, urlPessoasObterTodos } from '../app.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  public ObterTodos() : Observable<any>{
    return this.http.get(`${urlDataDomain}${urlPessoasObterTodos}`)
  }
}