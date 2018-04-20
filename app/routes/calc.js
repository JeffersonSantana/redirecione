module.exports = function(application) {

  //Route EndPoint index calcular
  application.get('/calcular', (req, res) => {
    application.app.controllers.calc.calc_form(application, req, res)
  })

  //Route EndPoint calcular
  application.get('/calcular/:weightProduct/:invoiceProduct', (req, res) => {
    application.app.controllers.calc.calc_price(application, req, res)
  })
}
