const EXCLUIRDEBITOERROR = "Kafka Producer Excluir Debito onError";

export class ExcluirDebitoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = EXCLUIRDEBITOERROR;
    Object.setPrototypeOf(this, ExcluirDebitoError.prototype);
  }
}
