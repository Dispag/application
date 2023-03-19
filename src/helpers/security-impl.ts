import "reflect-metadata";
import { Injectable } from "@nestjs/common";
import jwt  from 'jsonwebtoken';
import { Security, SecurityParams, LoginParams } from "../domain/index";
import { TokenExpiradoError } from "src/exceptions";

const secret = process.env.SECRET || "";

@Injectable()
export class SecurityImpl implements Security{
    
    params: SecurityParams;

    constructor() {}

    private async tokenExpirado(): Promise<Boolean>{

        jwt.verify(this.params.headers.token,  secret, function(err) {      
            if (err){ 
              
              throw new TokenExpiradoError("Token Expirado");
            }
          });
        return false;
    }

    private async haTokenEUuid(): Promise<Boolean>{

        return !this.params.headers || !this.params.headers.token || !this.params.headers.uuid;
    }
    
    public async exec(params: SecurityParams):  Promise<Boolean>{

        this.params = params;
        const haTokenEUuid = new Promise<Boolean>(() => this.haTokenEUuid());
        const tokenExpirado = new Promise<Boolean>(() => this.tokenExpirado());
        return await Promise.all<Boolean>([haTokenEUuid, tokenExpirado]).then(results => results.reduce((result1, result2) => result1 && !result2));
    }

    public gerarToken(params: LoginParams): string{

        return  jwt.sign({ id: params.user, senha: params.senha }, secret, {
            expiresIn: 86400 // validade do token, 24hrs
        });
    }
}
    