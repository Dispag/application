import "reflect-metadata";
import jwt  from 'jsonwebtoken';
import { VerifySecurity, VerifySecurityParams } from "../domain/verify-security";





export class VerifySecurityImpl implements VerifySecurity{

    params: VerifySecurityParams;
    secret: string;

    constructor() {
        this.secret = process.env.SECRET || "";
    }


    private async tokenExpirado(): Promise<Boolean>{

        

        jwt.verify(this.params.headers.token,  this.secret, function(err) {      
            if (err){ 
              
              throw new TokenExpiradoError("Token Expirado");
            }
          });
        return false;
    }


    private async haTokenEUuid(): Promise<Boolean>{

        return !this.params.headers || !this.params.headers.token || !this.params.headers.uuid;
    }
    
    public async exec(params: VerifySecurityParams):  Promise<Boolean>{

        this.params = params;
        const haTokenEUuid = new Promise<Boolean>(() => this.haTokenEUuid());
        const tokenExpirado = new Promise<Boolean>(() => this.tokenExpirado());
        return await Promise.all<Boolean>([haTokenEUuid, tokenExpirado]).then(results => results.reduce((result1, result2) => result1 && !result2));
    }

}
    