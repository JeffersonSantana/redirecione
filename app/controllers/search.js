//TODO: Melhoria seria buscar nos resultados a mesma query novamente, afim de voltar dados mais precisos


//Controller price
module.exports.search_product = function(application, req, res) {

  var
    fs = require('fs')
    request = require('request')
    cheerio = require('cheerio')

  /**
   * @method calcCommission
   */
  function calcCommission(price) {

    let treatedPrice = price.replace(".","")
        treatedPrice = treatedPrice.replace(",",".")
        treatedPrice = parseFloat(treatedPrice)

    let commission = (treatedPrice < parseInt(process.env.CUTOFF_VALUE)) ?
      parseInt(process.env.COMMISSION_RETAIL) : parseInt(process.env.COMMISSION_WHOLESALE)

    price = ((treatedPrice * (100 + commission)) / 100).toFixed(2)

    //Instanciando o objeto
    formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

    return formatter.format(price)
  }

  /**
   * @method getPayLoadListPdp
   */
  function getPayLoadListPdp($) {
    var tabela = $('.tbl-produtos tr')

    if(tabela.length > 0) {

      // Objeto que irá armazenar a tabela
      var resultado = {}
      resultado.query = req.query.q
      resultado.date = new Date()
      resultado.result = []

      for(var i = 0; i < 4; i++) {
        let el = cheerio.load(tabela[i])

        // Inserindo os dados obtidos no nosso objeto
        resultado.result.push({
          name_product: el('.tbl-produtos-produto a').text().split('Adicionar à lista de desejos')[0],
          price_product: calcCommission(el('.tbl-produtos-preco .preco-reais').text().trim().split('R$ ')[1]),
          photo_product: (el('.tbl-produtos-foto img').attr('src')) ? domainScrapper + el('.tbl-produtos-foto img').attr('src') : '/img/sem-imagem.gif'
        })
      }
    }

    return resultado
  }

  if(req.query.q) {

    // Endereço de raspagem
    var domainScrapper = 'http://www.comprasparaguai.com.br'

    // Requisição da página para raspagem
    url = domainScrapper + '/busca/?q=' + req.query.q.replace(' ', '+')
    request(url, function(error, response, html) {

      // Assegurar que não tenha erros para fazer a raspagem de dados com sucesso
      if (!error) {
        var $ = cheerio.load(html)

        var hrefProduct = $('.tbl-produtos tr').first().find('.ver-ofertas a').attr('href')

        // Pegar endereço do primeiro item, que possui todos os resultados da busca
        urlRes = domainScrapper + hrefProduct

        // Raspagem da página que contém os resultados
        request(urlRes, function(errorRes, responseRes, htmlRes) {

          /**
           * Existe junção de produtos
           */
          if (!errorRes) {
            application.winston.log('info', 'Junção de produtos: ' + req.query.q)
            res.render("search/index", {resultado: getPayLoadListPdp(cheerio.load(htmlRes)).result, query: req.query.q})
          } else {

            /**
             * Não existe junção de produtos
             */
             var tabela = $('.tbl-produtos tr')

             if(tabela.length > 0) {

              // Objeto que irá armazenar a tabela
              var resultado = {}
              resultado.query = req.query.q
              resultado.date = new Date()
              resultado.result = []

              for(var i = 0; i < 4; i++) {
                let el = cheerio.load(tabela[i])

                // Inserindo os dados obtidos no nosso objeto
                resultado.result.push({
                  name_product: el('.tbl-produtos-produto a').text().split('Adicionar à lista de desejos')[0],
                  price_product: calcCommission(el('.tbl-produtos-preco .preco-reais').text().trim().split('R$ ')[1]),
                  photo_product: (el('.tbl-produtos-foto img').attr('src')) ? domainScrapper + el('.tbl-produtos-foto img').attr('src') : '/img/sem-imagem.gif'
                })
              }

              application.winston.log('info', 'Não existe junção de produtos: ' + req.query.q)
              res.render("search/index", {resultado: resultado.result, query: '', q: req.query.q})
            } else {
              application.winston.log('info', 'Não existe produto: ' + req.query.q)
              res.render("search/index", {resultado: '', query: '', q: req.query.q})
            }
          }
        })
      }
    })
  } else {
    application.winston.log('info', 'URL não localizada: ' + req.query.q)
    res.render("search/index", {resultado: [], query: '', q: null})
  }
}
