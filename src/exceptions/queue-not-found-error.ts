const QUEUE_NOT_FOUND_ERROR = "ERROR =>> Nao encontrado a fila]";

export class QueueNotFoundError extends Error {
    constructor(message: string) {
      super(message)
      this.name = QUEUE_NOT_FOUND_ERROR
      Object.setPrototypeOf(this, QueueNotFoundError.prototype)
    }
}
