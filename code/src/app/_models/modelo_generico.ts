export abstract class ModeloGenerico {
  id: number;
  ativo: boolean;
  abstract getKey(): string;
}
