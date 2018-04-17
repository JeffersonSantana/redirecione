//Controller price
module.exports.search_product = function(application, req, res) {

  var
    fs = require('fs')
    request = require('request')
    cheerio = require('cheerio')
    concat = require('array-concat')

  /**
   * @method calcCommission
   */
  function calcCommission(price) {
    price = price.replace('.','')
    price = price.replace(',','.')
    price = ((price * 125) / 100) + 45.97

    //Instanciando o objeto
    var formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return formatter.format(price)
  }

  if(req.query.q) {

    /**
     * Leitura no arquivo de cache local
     */
    fs.readFile('./file_store/cache_price.json', 'utf8', function readFileCallback(err, data){

      // ERRO
      if (err){
        console.log(err);
        return;
      }

      // Objeto do arquivo de cache
      let obj = JSON.parse(data);

      // Iteração por todos os caches gravados
      obj.cache.forEach(function(cache_item) {

        // Se a busca tiver em cache, irá ser utilizada
        if(cache_item.query === req.query.q) {
          res.render("search/index", {resultado: cache_item.result, query: req.query.q});
        }
      });

      // Endereço de raspagem
      var domainScrapper = 'http://www.comprasparaguai.com.br'

      // Requisição da página para raspagem
      url = domainScrapper + '/busca/?q=' + req.query.q.replace(' ', '+');
      request(url, function(error, response, html) {

        // Assegurar que não tenha erros para fazer a raspagem de dados com sucesso
        if (!error) {
          var $ = cheerio.load(html);

          var hrefProduct = $('.tbl-produtos tr').first().find('.ver-ofertas a').attr('href');

          // Pegar endereço do primeiro item, que possui todos os resultados da busca
          urlRes = domainScrapper + hrefProduct;

          // Raspagem da página que contém os resultados
          request(urlRes, function(errorRes, responseRes, htmlRes) {

            if (!errorRes) {
              $ = cheerio.load(htmlRes);

              var tabela = $('.tbl-produtos tr');

              // Objeto que irá armazenar a tabela
              var resultado = {};
              resultado.query = req.query.q;
              resultado.date = new Date();
              resultado.result = [];

              for(var i = 0; i < 4; i++) {
                let el = cheerio.load(tabela[i]);

                // Inserindo os dados obtidos no nosso objeto
                resultado.result.push({
                  name_product: el('.tbl-produtos-produto a').text().split('Adicionar à lista de desejos')[0],
                  price_product: calcCommission(el('.tbl-produtos-preco .preco-reais').text().trim().split('R$ ')[1]),
                  photo_product: domainScrapper + el('.tbl-produtos-foto img').attr('src')
                });
              }

              // Gravar novo cache
              // obj.cache.push(resultado.result);
              // let json = JSON.stringify(obj);
              // fs.writeFile('./file_store/cache_price.json', json, 'utf8');

              res.render("search/index", {resultado: resultado.result, query: req.query.q});
            } else {
              res.render("search/index", {resultado: '', query: 'Qual produto?', q: req.query.q});
            }
          })
        }
      })
    });
  } else {
    res.render("search/index", {resultado: [], query: 'Qual produto?', q: null});
  }
}
