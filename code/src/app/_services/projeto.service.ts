import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { urlDataDomain, urlProjetosAdicionar, urlProjetosObterTodos } from '../app.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  Adicionar(obj: any) {
    return this.http.post<any>(`${urlDataDomain}${urlProjetosAdicionar}`, obj);
  }

  public ObterTodos() : Observable<any>{
    return this.http.get(`${urlDataDomain}${urlProjetosObterTodos}`)
  }
}
