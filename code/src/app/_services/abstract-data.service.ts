import { ModeloGenerico } from '../_models/modelo_generico';
import { TipoModelo } from '../_models/interfaces/tipo.model';
import { HttpService } from './http.service';

import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ModeloRetorno } from '../_models/interfaces/modelo.retorno';
import { environment } from '../../environments/environment';

export class AbstractDataService {
  url: string;
  private headers: Headers;

  constructor(private httpSvc: HttpService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  private executaAcaoHttp(metodo: string, modelo?: any) {
    switch (metodo) {
      case 'get':
        return this.httpSvc.get(this.url, { headers: this.headers }).map(res => {
          return res.json();
        });
      case 'export':
        return this.httpSvc.get(this.url, { headers: this.headers }).map(res => {
          return res;
        });
      case 'post':
        return this.httpSvc.post(this.url, modelo, { headers: this.headers }).map(res => {
          return res.json();
        });
      case 'put':
        return this.httpSvc.put(this.url, modelo, { headers: this.headers }).map(res => {
          return res.json();
        });
      case 'delete':
        return this.httpSvc.delete(this.url, { headers: this.headers }).map(res => {
          return res.json();
        });
    }
  }

  excluir<T extends ModeloGenerico>(modeloTipo: TipoModelo<T>, id: number): Observable<ModeloRetorno> {
    this.url = `${this.montarUrlPorTipo(modeloTipo)}/${id}`;
    return this.executaAcaoHttp('delete');
  }

  ativar<T extends ModeloGenerico>(modeloTipo: TipoModelo<T>, id: number): Observable<ModeloRetorno> {
    this.url = `${this.montarUrlPorTipo(modeloTipo)}/Ativar/${id}`;
    return this.executaAcaoHttp('put');
  }

  desativar<T extends ModeloGenerico>(modeloTipo: TipoModelo<T>, id: number): Observable<ModeloRetorno> {
    this.url = `${this.montarUrlPorTipo(modeloTipo)}/Desativar/${id}`;
    return this.executaAcaoHttp('put');
  }

  salvar<T extends ModeloGenerico>(modelo: T, modeloTipo?: TipoModelo<T>, urlAlternativa?: string): Observable<ModeloRetorno> {
    const acao = modelo.id && modelo.id > 0 ? 'put' : 'post';
    this.url = `${this.montarUrlPorTipo(modeloTipo, urlAlternativa)}${acao == 'put' ? `/${modelo.id}` : ''}`;
    return this.executaAcaoHttp(acao, modelo);
  }

  postViewModel(modelo: any, urlApi: string) {
    this.url = this.montarUrlGenerica(urlApi);
    return this.executaAcaoHttp('post', modelo);
  }

  putViewModel(modelo: any, urlApi: string) {
    this.url = this.montarUrlGenerica(urlApi);
    return this.executaAcaoHttp('put', modelo);
  }

  postLista<T extends ModeloGenerico>(modelo: Array<T>, modeloTipo: TipoModelo<T>, urlAlternativa?: string): Observable<ModeloRetorno> {
    this.url = this.montarUrlPorTipo(modeloTipo, urlAlternativa);
    return this.executaAcaoHttp('post', modelo);
  }

  obter<T extends ModeloGenerico>(modelo: T, urlAlternativa?: string): Observable<ModeloRetorno> {
    this.url = this.montarUrl(modelo, urlAlternativa);
    if (!urlAlternativa) {
      this.url += `/${modelo.id}`;
    }
    return this.executaAcaoHttp('get', modelo);
  }

  listar<T extends ModeloGenerico>(modelo: TipoModelo<T>, filtro?: any, urlAlternativa?: string): Observable<ModeloRetorno> {
    this.url = this.montarUrlPorTipo(modelo, urlAlternativa);
    this.url = urlAlternativa != null && urlAlternativa !== undefined ? this.url : `${this.url}/BuscarPor`;
    if (filtro && filtro !== undefined && filtro != null && Object.keys(filtro).length > 0) {
      this.incluirFiltros(filtro);
    }
    return this.executaAcaoHttp('get');
  }

  exportar<T extends ModeloGenerico>(modelo: TipoModelo<T>, tipoExportar: string, filtro?: any, urlAlternativa?: string): Observable<any> {
    this.url = `${this.montarUrlPorTipo(modelo, urlAlternativa)}/exportar?tipoArquivo=${tipoExportar || 'csv'}`;
    if (filtro && filtro !== undefined && filtro != null && Object.keys(filtro).length > 0) {
      this.incluirFiltros(filtro);
    }
    return this.executaAcaoHttp('export');
  }

  downloadFile(result) {
    let blob = new Blob([atob(result.data.fileContents)], { type: result.data.contentType });
    let url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = result.data.fileDownloadName;
    anchor.href = url;
    anchor.click();
  }

  criarLista<T extends ModeloGenerico>(modeloTipo: TipoModelo<T>, lista: Array<T>) {
    this.url = `${this.montarUrlPorTipo(modeloTipo)}/CriarLista`;
    return this.httpSvc.post(this.url, lista, { headers: this.headers }).map(res => {
      return res.json();
    });
  }

  atualizarLista<T extends ModeloGenerico>(modeloTipo: TipoModelo<T>, lista: Array<T>) {
    this.url = `${this.montarUrlPorTipo(modeloTipo)}/AtualizarLista`;
    return this.httpSvc.put(this.url, lista, { headers: this.headers }).map(res => {
      return res.json();
    });
  }

  muitiGet(urls: Array<string>): Promise<any[]> {
    let resuktList = new Array<any>();
    urls.forEach(f => {
      resuktList.push(this.httpSvc.get(this.montarUrlGenerica(f)));
    });

    return Observable.forkJoin(resuktList).toPromise();
  }

  private montarUrl<T extends ModeloGenerico>(modelo: T, urlAlternativa?: string): string {
    let url = `${environment.api}/api/${modelo.getKey()}`;
    url = urlAlternativa != null && urlAlternativa !== undefined ?
      `${url}/${urlAlternativa}` :
      url;
    return url;
  }

  private montarUrlPorTipo<T extends ModeloGenerico>(tipoModelo: TipoModelo<T>, urlAlternativa?: string): string {
    const key = tipoModelo.prototype.getKey();
    let url = `${environment.api}/api/${key}`;
    url = urlAlternativa != null && urlAlternativa !== undefined ?
      `${url}/${urlAlternativa}` :
      url;
    return url;
  }

  private montarUrlGenerica(segmentoUrl: string): string {
    return `${environment.api}/api/${segmentoUrl}`;
  }

  private incluirFiltros(filtro?: any) {
    const chaves = Object.keys(filtro);
    for (let i = 0; i < chaves.length; i++) {
      const chave = chaves[i];
      const valor = filtro[chave];
      this.url += (valor !== null && valor !== undefined) ? `${(i === 0 ? '?' : '&')}${chave}=${valor}` : '';
    }
  }


}
