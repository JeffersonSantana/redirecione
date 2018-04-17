//Controller send contact email
module.exports.sendContact = function(application, req, res) {

  var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');
  // var xoauth2 = require('xoauth2');

  var smtpAmazon = {
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 465,
    secure: true,
    auth: {
      user: 'AKIAJBHBLJ4E7ZIL3PUA',
      pass: 'Au4GXTLlMjTOSxIouXX1SofvhGHKbJ8rbAmnprzU9Hhl'
    }
  }

  var transport = nodemailer.createTransport(smtpTransport(smtpAmazon));

  var text = 'Nome: ' + req.query.recipientName + '\n';
  text += 'E-mail: ' + req.query.recipientEmail + '\n';
  text += 'Produto: ' + req.query.recipientProduct;

  var mailOptions = {
    from: 'Jefferson Santana <je.americana@gmail.com>', // sender address
    to: req.query.recipientEmail, // list of receivers
    subject: 'Novo pedido | RedirecioneBr', // Subject line
    text: text // plaintext body
  };

  transport.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    }
    else{
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });

};
