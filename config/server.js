var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

load()
  .then('app/routes', {verbose:true})
  .then('config/pagSeguro.js', {verbose:true})
  .then('app/models', {verbose:true})
  .then('app/controllers', {verbose:true})
  .into(app);

module.exports = app;
