const Orcamento  = require('./orcamento');
const Credor  = require('./credor');

interface Debito {

    valor: number;

    marcacao: string;

    credor: Credor;

    orcamento: Orcamento;

    vencimento: Date;

}

module.exports = { 
    Debito
};
