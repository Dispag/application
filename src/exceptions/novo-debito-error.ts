const NOVODEBITOERROR = "ERROR =>> Kafka Producer Novo Debito";

export class NovoDebitoError extends Error {
    constructor(message: string) {
      super(message)
      this.name = NOVODEBITOERROR
      Object.setPrototypeOf(this, NovoDebitoError.prototype)
    }
}
