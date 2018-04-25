module.exports = function(application) {

  //Route home
  application.get('/', function(req, res){
    // application.app.controllers.home.index(application, req, res); TODO: MVP
    res.redirect('/busca');
  });

  //Route home V2
  application.get('/v2', function(req, res){
    // application.app.controllers.home.index(application, req, res); TODO: MVP
    res.redirect('/busca/v2');
  });
};
