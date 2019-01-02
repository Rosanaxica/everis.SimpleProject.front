import { Injectable } from '@angular/core';
import { urlDataDomain } from 'src/app/app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empresa } from '../_models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private httpClient: HttpClient) { }

  Adicionar(obj: Empresa) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.post<Empresa>(`${urlDataDomain}api/Empresa/Adicionar`, obj, options);
  }

  ObterLista() {
    return this.httpClient.get(`${urlDataDomain}api/Empresa/ObterTodos`);
  }
}
