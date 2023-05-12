import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegistrarDebitoUseCase, RegistrarDebitoUseCaseParams } from '../../domain';
import { HttpResponse, Response } from "../../helpers/http-response";

@Controller('debito')
export class RegistrarDebitoController {

  constructor(@Inject(RegistrarDebitoUseCase) protected readonly registrarDebitoUseCase: RegistrarDebitoUseCase) {}

  @Post('registrar')
  async registrar( @Body() params: RegistrarDebitoUseCaseParams): Promise<Response> {

    try{

      await this.registrarDebitoUseCase.registrar(params);
      return HttpResponse.successDefault('OK');
    }catch (exception) {
    
      console.error('[REGISTRARDEBITO-CONTROLLER] Lançado Error em Registrar Debito...', exception);
      return HttpResponse.reponseException(exception);
    }

  }

}

