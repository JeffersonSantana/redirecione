//Controller payment_pagseguro_controller
module.exports.payment_pagseguro_controller = function(application, req, resp) {
  resp.end();
  
  // const parseString = require('xml2js').parseString
  //
  // //Inicializar a função Pag Seguro
  // var pag = application.config.pagSeguro
  //
  // //Configurando a moeda e a referência do pedido
  // pag.currency('BRL');
  // pag.reference('12345');
  //
  // //Adicionando itens
  // pag.addItem({
  //     id: 1,
  //     description: 'Descrição do primeiro produto',
  //     amount: "4230.00",
  //     quantity: 3,
  //     weight: 2342
  // });
  //
  // pag.addItem({
  //     id: 2,
  //     description: 'Esta é uma descrição',
  //     amount: "5230.00",
  //     quantity: 3,
  //     weight: 2342
  // });
  //
  // pag.addItem({
  //     id: 3,
  //     description: 'Descrição do último produto',
  //     amount: "8230.00",
  //     quantity: 3,
  //     weight: 2342
  // });
  //
  // //Configurando as informações do comprador
  // pag.buyer({
  //     name: 'José Comprador',
  //     email: 'c63703154378446600929@sandbox.pagseguro.com.br',
  //     phoneAreaCode: '51',
  //     phoneNumber: '12345678'
  // });
  //
  // //Configurando a entrega do pedido
  //
  // pag.shipping({
  //     type: 1,
  //     street: 'Rua Alameda dos Anjos',
  //     number: '367',
  //     complement: 'Apto 307',
  //     district: 'Parque da Lagoa',
  //     postalCode: '01452002',
  //     city: 'São Paulo',
  //     state: 'RS',
  //     country: 'BRA'
  // });
  //
  // //Configuranto URLs de retorno e de notificação (Opcional)
  // //ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
  // pag.setRedirectURL("http://localhost:5000/retorno");
  // pag.setNotificationURL("http://localhost:5000/notificacao");
  //
  // //Enviando o xml ao pagseguro
  // pag.send(function(err, res) {
  //     if (err) {
  //         console.log(err);
  //     }
  //
  //     parseString(res, function (err, result) {
  //       resp.redirect('https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=' + result.checkout.code);
  //     });
  // });
};
