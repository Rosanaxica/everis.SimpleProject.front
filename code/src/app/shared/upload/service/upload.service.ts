import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  endereco: string = 'https://file.io';

  constructor(
    private http: HttpClient,
  ) { }

  upload(formData: FormData) {
    const req = new HttpRequest<FormData>('POST', this.endereco, formData, {
      reportProgress: true
    })

    return this.http.request(req);
  }
}