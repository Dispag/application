
import { AuthenticatorUseCase } from '../../domain/index';
import { Body, Controller, Inject, Post } from '@nestjs/common';


interface HttpRequest {
  user: string,
  senha: string
}

@Controller('auth')
export class AuthenticatorController {

  constructor(@Inject(AuthenticatorUseCase) protected readonly authenticatorUseCase: AuthenticatorUseCase) {}

  @Post('login')
  async login( @Body() params: HttpRequest): Promise<string> {

    const response = JSON.stringify(await this.authenticatorUseCase.login({...params}));
    return response;
  }

}

