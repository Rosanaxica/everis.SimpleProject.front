export interface TipoModelo<T> {
  new(...args: any[]): T;
}
