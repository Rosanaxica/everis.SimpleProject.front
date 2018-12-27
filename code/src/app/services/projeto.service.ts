import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { urlDataDomain, urlProjetosAdicionar } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  Adicionar(obj: any){
    return this.http.post<any>(`${urlDataDomain}${urlProjetosAdicionar}`, obj)
  }
}
