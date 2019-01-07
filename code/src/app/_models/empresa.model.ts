import { ModeloGenerico } from './modelo_generico';

export class Empresa extends ModeloGenerico {
  nome: string;
  segmento: TipoSeguimento;
  getKey(): string {
    return 'Empresa';
  }
}


export enum TipoSeguimento {
  Banking = 0,
  Telecomunicacao = 1
}
