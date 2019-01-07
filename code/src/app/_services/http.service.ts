import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {
  Http,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Request,
  Headers,
  XHRBackend,
} from '@angular/http';

import { LoaderService } from './loader.service';

@Injectable()
export class HttpService extends Http {
  
  constructor(

    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private route: Router,
    private loaderService: LoaderService
  ) {
    super(backend, defaultOptions);
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    url = url.replace('?id=', '/');
    url = decodeURIComponent(url);
    return super.get(url, options)
      .do((res: Response) => {
        res;
      })
      .finally(() => {
        this.onEnd();
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    url = decodeURIComponent(url);
    return super.post(url, body, options)
      .do((res: Response) => {
        res;
      })
      .finally(() => {
        this.onEnd();
      });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    url = decodeURIComponent(url);
    return super.put(url, body, options)
      .do((res: Response) => {
        res;
      })
      .finally(() => {
        this.onEnd();
      });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    url = decodeURIComponent(url);
    return super.delete(url, options)
      .do((res: Response) => {
        res;
      })
      .finally(() => {
        this.onEnd();
      });
  }

  private onEnd(): void {
    this.hideLoader();
  }

}
