module.exports = function(application) {

  //Route EndPoint calcular
  application.get('/calcular', function(req, res){
    application.app.controllers.calc.calcular_importacao_controller(application, req, res);
  });
};
