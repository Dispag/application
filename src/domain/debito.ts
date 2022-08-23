import { Credor } from "./credor";
import { Orcamento } from "./orcamento";

export interface Debito {

    valor: number;

    marcacao: string;

    credor: Credor;

    orcamento: Orcamento;

    vencimento: Date;

}

