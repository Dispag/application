import { Inject, Injectable } from "@nestjs/common";
import { RegistrarDebito, RegistrarDebitoParams, EventSource } from "../domain";
import { AusenciaDadosError } from "../exceptions";


@Injectable()
export class RegistrarDebitoImpl implements RegistrarDebito{
    
    constructor ( @Inject(EventSource) protected readonly eventSource: EventSource){
    }

    private verifyBody(params: RegistrarDebitoParams): void{
        if (!params ||
            !params.valor ||
            !params.marcacao ||
            !params.credor ||
            !params.orcamento ||
            !params.vencimento ||
            !params.credor.descricao ||
            !params.credor.tipo ||
            !params.orcamento.mes ||
            !params.orcamento.ano)
            throw new AusenciaDadosError('');
    }
    
    async registrar(params: RegistrarDebitoParams): Promise<void> {

        const queueName = process.env.QUEUENAME_REGISTRARDEBITO
        this.verifyBody(params);
        await this.eventSource.push({
                queueName,
                body: JSON.stringify(params)
        });
    }

}