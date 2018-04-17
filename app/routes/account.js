module.exports = function(application) {

  //Route login
  application.get('/entrar', function(req, res){
    application.app.controllers.account.login(application, req, res);
  });

  //Route register
  application.get('/cadastrar', function(req, res){
    application.app.controllers.account.register(application, req, res);
  });
};
