export abstract class ModeloGenerico {
  Id: number;
  Ativo: boolean;
  abstract getKey(): string;
}
