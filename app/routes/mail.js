module.exports = function(application) {

  //Route home
  application.get('/mail', function(req, res){
    application.app.controllers.mail.sendContact(application, req, res);
  });
};
