module.exports = function(application) {

  //Route price
  application.get('/busca', function(req, res){
    application.app.controllers.search.search_product(application, req, res);
  });
};
