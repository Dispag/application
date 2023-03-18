import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import "reflect-metadata";
import { AuthenticateParams, UsuarioRepository } from "../domain/usuario-repository";


@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
    
    constructor (@Inject('Pool') private readonly pool: Pool){

    }
    
    async authenticate(params: AuthenticateParams): Promise<Boolean> {
        const QUERY_USUARIO = ` SELECT u.use_id, u.nome FROM tb_usuario u WHERE u.login = '${params.user}' and  u.senha = '${params.passwd}' `;
        const result = await this.pool.query(QUERY_USUARIO);
        return result.rowCount>0;
    }
    
}