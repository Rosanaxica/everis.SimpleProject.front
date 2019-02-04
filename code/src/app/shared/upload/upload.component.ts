import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { HttpResponse, HttpEventType, HttpProgressEvent } from '@angular/common/http';

import { UploadService } from './service/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  link: string;
  fileName: string;
  progress: string;
  httpEmitter: Subscription;
  @Input() formatos: string[];
  @Input() tamanho: number;

  constructor(private service: UploadService) {
  }

  ngOnInit() {
    if (!this.formatos) throw new Error('É necessário informar os formatos de upload permitidos.');
  }

  upload(file: FileList) {
    this.cancela();

    const formData = this.formatoTamanhoPipe(file);

    if (!formData) return;

    this.httpEmitter = this.service.upload(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = `${this.calculoProgresso(event)}%`;
        } else if (event instanceof HttpResponse) {

          if (event.status == 200) {
            this.link = event.body['link'];
            window.alert('Upload executado com sucesso!');
          }
          else {
            window.alert(`Não pudemos concluir o upload: ${event.headers['message']}`);
          }

          delete this.httpEmitter;
        }
      },
        error => window.alert("Error Uploading" + error)
      );
  }

  cancela() {
    this.progress = undefined;
    this.fileName = undefined;

    if (this.httpEmitter) {
      this.httpEmitter.unsubscribe();
    }
  }

  formatoTamanhoPipe(files: FileList): FormData {
    let formData = new FormData();

    Array.from(files).forEach(d => {
      if (!Array.from(this.formatos).includes(d.type.substring(d.type.lastIndexOf('/') + 1))) {
        window.alert('Arquivo em formato inválido!');
        formData = undefined;
      }

      if (this.tamanho && this.tamanho < d.size) {
        window.alert('Arquivo maior que o permitido!');
        formData = undefined;
      }

      if (formData) {
        formData.append('file', d);
        this.fileName = d.name;
      }

    });

    return formData;
  }

  calculoProgresso(event: HttpProgressEvent) {
    return Math.round(100 * event.loaded / event.total);
  }
}