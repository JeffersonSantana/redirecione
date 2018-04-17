module.exports = function(application) {

  //Route paayment
  application.get('/confirmacao', function(req, res){
    application.app.controllers.checkout.checkout(application, req, res);
  });
};
