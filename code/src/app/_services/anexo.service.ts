import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { urlDataDomain, urlAnexosAdicionar } from '../app.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AnexoService {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  Adicionar(obj: any) {
    return this.http.post<any>(`${urlDataDomain}${urlAnexosAdicionar}`, obj);
  }
}
