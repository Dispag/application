import { Response } from "../helpers/http-response";
import { AuthenticatorUseCase, LoginParams, UsuarioRepository } from "../domain/index";
import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class AuthenticatorUseCaseImpl implements AuthenticatorUseCase{
    
    
    constructor (@Inject() private readonly usuarioRepository: UsuarioRepository){

    }


    
    async login(params: LoginParams): Promise<Response> {




        throw new Error("Method not implemented.");
    }



    
}