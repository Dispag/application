
const TOKENEXPIRADOERROR = "Token expirado error"

export class TokenExpiradoError extends Error {
    constructor(message) {
      super(message)
      this.name = TOKENEXPIRADOERROR
      Object.setPrototypeOf(this, TokenExpiradoError.prototype)
    }
}