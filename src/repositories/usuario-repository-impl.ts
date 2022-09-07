import { Pool } from 'pg';
import { inject } from "inversify";
import TYPES from "../container/types";
import "reflect-metadata";
import { AuthenticateParams, UsuarioRepository } from "../domain/usuario-repository";



export class UsuarioRepositoryImpl implements UsuarioRepository {
    
    constructor (@inject(TYPES.DataSourcePool) private dataSourcePool: Pool){

    }
    
    async authenticate(params: AuthenticateParams): Promise<Boolean> {
        const QUERY_USUARIO = ` SELECT u.use_id, u.nome FROM tb_usuario u WHERE u.login = '${params.user}' and  u.senha = '${params.passwd}' `;
        const result = await this.dataSourcePool.query(QUERY_USUARIO);
        return result.rowCount>0;
    }
    
}