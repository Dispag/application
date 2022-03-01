'use strict';

const {saldosDebitosNoMes, detalhesDebitosNoMes} = require('../../../../libs/repositories/debitos-repository');
const {run} = require('../query');


module.exports.saldosmes = async event => {

   return await run(event, saldosDebitosNoMes)
}

module.exports.datelhes = async event => {

    return await run(event, detalhesDebitosNoMes)
}
