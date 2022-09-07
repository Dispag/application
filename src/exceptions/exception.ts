const NOVODEBITOERROR = "ERROR =>> Kafka Producer Novo Debito";
const EXCLUIRDEBITOERROR = "Kafka Producer Excluir Debito onError";
const PAGARDEBITOERROR = "Kafka Producer Pagar Debito onError";
const PUSHTOPICERROR = "Error ao push Topic";
const AUSENCIAHEADERSFUNDAMENTAISERROR = "Ausencia de Headers Fundamentais";
const AUSENCIADADOSERROR = "Ausencia Dados Fundamentais";
const TOKENEXPIRADOERROR = "Token expirado error";


export class NovoDebitoError extends Error {
    constructor(message) {
      super(message)
      this.name = NOVODEBITOERROR
      Object.setPrototypeOf(this, NovoDebitoError.prototype)
      console.dir(this)
    }
}

export class ExcluirDebitoError extends Error {
  constructor(message) {
    super(message)
    this.name = EXCLUIRDEBITOERROR
    Object.setPrototypeOf(this, ExcluirDebitoError.prototype)
    console.dir(this)
  }
}

export class PagarDebitoError extends Error {
  constructor(message) {
    super(message)
    this.name = PAGARDEBITOERROR
    Object.setPrototypeOf(this, PagarDebitoError.prototype)
    console.dir(this)
  }
}

export class PushTopicError extends Error {
  constructor(message) {
    super(message)
    this.name = PUSHTOPICERROR
    Object.setPrototypeOf(this, PushTopicError.prototype)
    console.dir(this)
  }
}

export class AusenciaHeadersFundamentaisError extends Error {
  constructor(message) {
    super(message)
    this.name = AUSENCIAHEADERSFUNDAMENTAISERROR
    Object.setPrototypeOf(this, AusenciaHeadersFundamentaisError.prototype)
    console.dir(this)
  }
}

export class AusenciaDadosError extends Error {
  constructor(message) {
    super(message)
    this.name = AUSENCIADADOSERROR
    Object.setPrototypeOf(this, AusenciaDadosError.prototype)
    console.dir(this)

  }
}

export class TokenExpiradoError extends Error {
  constructor(message) {
    super(message)
    this.name = TOKENEXPIRADOERROR
    Object.setPrototypeOf(this, TokenExpiradoError.prototype)
    console.dir(this)
  }
}