const AUSENCIA_DE_DADOS_ERROR = "Ausencia de Dados";

export class AusenciaDadosError extends Error {
  constructor(message) {
    super(message);
    this.name = AUSENCIA_DE_DADOS_ERROR;
    Object.setPrototypeOf(this, AusenciaDadosError.prototype);
  }
}
