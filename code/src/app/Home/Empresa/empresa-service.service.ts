import { Injectable } from '@angular/core';
import { urlDataDomain } from 'src/app/app.api';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error.handler';
import { Observable } from 'rxjs';
import { Empresa } from './empresa.model';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private httpClient: HttpClient) { }

  // Adicionar(obj: Empresa): Observable<Empresa> {
  //   const headers = new Headers({ 'Content-Type': 'application/json' });
  //   const options = new RequestOptions({ headers: headers });
  //   return this.http.post(`${urlDataDomain}/Empresa/Adicionar`, obj, options)
  //     .map(response => response.json())
  //     .catch(ErrorHandler.handleError);
  // }

  Adicionar(obj: Empresa) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.post<Empresa>(`${urlDataDomain}/Empresa/Adicionar`, obj, options)
      .catch(ErrorHandler.handleError);
  }

  // ObterLista(): Observable<Empresa[]> {
  //   return this.http.get(`${urlDataDomain}/Empresa/ObterTodos`)
  //     .map(response => response.json())
  //     .catch(ErrorHandler.handleError);
  // }


  ObterLista(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(`${urlDataDomain}/Empresa/ObterTodos`)
    .map(response => response)
    .catch(ErrorHandler.handleError);
  }
}
