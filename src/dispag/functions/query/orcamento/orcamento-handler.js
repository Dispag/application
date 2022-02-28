const {orcamentoAnoMes} = require('../repository/orcamento-repository')
const {run} = require('../../../../query/query')

module.exports.orcamentoanomes = async event => {

   return run(event, orcamentoAnoMes)
}