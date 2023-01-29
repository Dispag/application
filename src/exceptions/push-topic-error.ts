const PUSHTOPICERROR = "Error ao push Topic";

export class PushTopicError extends Error {
    constructor(message: string) {
      super(message)
      this.name = PUSHTOPICERROR
      Object.setPrototypeOf(this, PushTopicError.prototype)
      console.dir(this)
    }
}