
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthenticatorUseCase } from '../../domain/index';
import { Response } from "../../helpers/http-response";


interface HttpRequest {
  user: string,
  senha: string
}

@Controller('auth')
export class AuthenticatorController {

  constructor(@Inject(AuthenticatorUseCase) protected readonly authenticatorUseCase: AuthenticatorUseCase) {}

  @Post('login')
  async login( @Body() params: HttpRequest): Promise<Response> {

    return await this.authenticatorUseCase.login({...params});
  }

}

