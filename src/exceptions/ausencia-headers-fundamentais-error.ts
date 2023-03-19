const AUSENCIAHEADERSFUNDAMENTAISERROR = "Ausencia de Headers Fundamentais";

export class AusenciaHeadersFundamentaisError extends Error {
    constructor(message) {
      super(message);
      this.name = AUSENCIAHEADERSFUNDAMENTAISERROR;
      Object.setPrototypeOf(this, AusenciaHeadersFundamentaisError.prototype);
    }
}