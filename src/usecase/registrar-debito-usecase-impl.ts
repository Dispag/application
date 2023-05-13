import { Inject, Injectable } from "@nestjs/common";

import {
  RegistrarDebitoUseCase,
  RegistrarDebitoUseCaseParams,
  EventSource,
} from "../domain";
import { AusenciaDadosError } from "../exceptions";

@Injectable()
export class RegistrarDebitoUseCaseImpl implements RegistrarDebitoUseCase {
  constructor(
    @Inject(EventSource) protected readonly eventSource: EventSource
  ) {}

  private verifyBody(params: RegistrarDebitoUseCaseParams): void {
    if (
      !params ||
      !params.valor ||
      !params.marcacao ||
      !params.credor ||
      !params.orcamento ||
      !params.vencimento ||
      !params.credor.descricao ||
      !params.credor.tipo ||
      !params.orcamento.mes ||
      !params.orcamento.ano
    )
      throw new AusenciaDadosError("");
  }

  async registrar(params: RegistrarDebitoUseCaseParams): Promise<void> {
    const queueName = process.env.QUEUENAME_REGISTRARDEBITO;
    this.verifyBody(params);
    await this.eventSource.push({
      queueName,
      body: JSON.stringify(params),
    });
  }
}
