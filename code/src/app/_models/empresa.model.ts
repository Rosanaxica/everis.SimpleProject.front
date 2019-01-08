import { ModeloGenerico } from './modelo_generico';

export class Empresa extends ModeloGenerico {
  nome: string;
  segmento: TipoSegmento;
  getKey(): string {
    return 'empresa';
  }
  getSegmentoString(): string {
    return this.segmento.toString();
  }
}


export enum TipoSegmento {
  Banking = 0,
  Telecomunicacao = 1
}
