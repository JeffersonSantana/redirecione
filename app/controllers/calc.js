//Controller Calc Home
module.exports.calc_form = (application, req, res) => {
  res.render("calc/index", {result: null})
}

//Controller Calc Result
module.exports.calc_price = (application, req, res) => {
  const request = require('request')
  const valorPorPeso = 23
  const porcentagemOtavio = 20

  var result = {}

  function getDolar() {
    var url = 'http://api.fixer.io/latest?base=USD&symbols=BRL';
    request(url, function(error, response, html) {
      if (!error) {
        result.dolar = {
          'today': JSON.parse(response.body)
        }

        frete(req.params.weightProduct)
        comissao(req.params.weightProduct, req.params.invoiceProduct)
        total(req.params.invoiceProduct)
        res.render("calc/index", {result: result})
      }
    })
  }
  getDolar()

  function converterReal(valor) {
    if (result.dolar.today) {
      return parseFloat(valor * result.dolar.today.rates.BRL).toFixed(2)
    }
  }

  function frete(peso) {
    result.frete = {
      'real': converterReal(parseFloat(parseFloat(peso) * valorPorPeso).toFixed(2)),
      'dolar': parseFloat(parseFloat(peso) * valorPorPeso).toFixed(2)
    }
  }

  function comissao(peso, vInvoice) {
    result.comissao = converterReal(parseFloat(((parseFloat(result.frete.real) +
      parseFloat(vInvoice)) * parseFloat(porcentagemOtavio)) / 100).toFixed(2))
  }

  function total(vInvoice) {
    result.total = parseFloat(result.frete.real) + parseFloat(result.comissao) + parseFloat(converterReal(vInvoice))
  }
}
