const {orcamentoAnoMes} = require('../../../../libs/repositories/orcamento-repository');
const {run} = require('../query');

module.exports.orcamentoanomes = async event => {

   return run(event, orcamentoAnoMes);
};