const express = require('express')
const load = require('express-load')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const winston = require('winston')
const dotenv = require('dotenv').config()

const app = express()

app.winston = winston
app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())

load()
  .then('app/routes', {verbose:true})
  .then('app/models', {verbose:true})
  .then('app/controllers', {verbose:true})
  .then('config/db.js', {verbose:true})
  // .then('config/pagSeguro.js', {verbose:true})
  .into(app)

module.exports = app
