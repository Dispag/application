const PAGARDEBITOERROR = "Kafka Producer Pagar Debito onError";

export class PagarDebitoError extends Error {
    constructor(message: string) {
      super(message)
      this.name = PAGARDEBITOERROR
      Object.setPrototypeOf(this, PagarDebitoError.prototype)
    }
}