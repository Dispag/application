import { v4 } from "uuid";
import { HttpResponse, Response } from "../helpers/http-response";
import {  AuthenticatorUseCase, LoginParams, Security, UsuarioRepository } from "../domain/index";
import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class AuthenticatorUseCaseImpl implements AuthenticatorUseCase{
    
    
    constructor ( @Inject(UsuarioRepository) protected readonly usuarioRepository: UsuarioRepository,
    @Inject(Security) protected readonly security: Security){

    }
    
    async login(params: LoginParams): Promise<Response> {

        if (!params.user || !params.senha ){
            return HttpResponse.naoAutenticadoReturn();
        }

        const res = await this.usuarioRepository.authenticate( { ...params } );
        const token = res ? this.security.gerarToken({...params}) : '';

        return res ? HttpResponse.autenticadoReturn({
            token, 
            uuid: v4(), 
            user: params.user
        }) : HttpResponse.naoAutenticadoReturn();
    }
    
}