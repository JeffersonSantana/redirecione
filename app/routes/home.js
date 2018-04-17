module.exports = function(application) {

  //Route home
  application.get('/', function(req, res){
    // application.app.controllers.home.index(application, req, res); TODO: MVP
    res.redirect('/busca');
  });
};
