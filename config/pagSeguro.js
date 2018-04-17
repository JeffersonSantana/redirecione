const pagseguro = require('pagseguro');
const pag = new pagseguro({
  email : 'je.americana@gmail.com',
  token: '73B67812B09B41D7B783E30C96E29891',
  mode : 'sandbox'
});

module.exports = function() {
  return pag
}
