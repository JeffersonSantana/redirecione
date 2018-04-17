module.exports = function(application) {

  //Route paayment
  application.get('/pagamento', function(req, res){
    application.app.controllers.payment.payment_pagseguro_controller(application, req, res);
  });
};
