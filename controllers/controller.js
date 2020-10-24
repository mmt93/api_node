var url = require('url')
const got = require("got");
var cron = require("node-cron");


function jsonEncoder(listTabulacao) {
    var responseElemSeparator = listTabulacao.body.split("<br>");
            objTabulacao = [];
            for (var i in responseElemSeparator) {
                var obj_split = new Object();
                var responseItemSeparator = responseElemSeparator[i].split("|");
        
                obj_split["id_tabulacao"] = responseItemSeparator[0];
                obj_split["descricao"] = responseItemSeparator[1];
                obj_split["tipo"] = responseItemSeparator[2];
        
                objTabulacao[i] = obj_split;
            }
      
            const jsonStr = JSON.stringify(objTabulacao);
            var recebido = JSON.parse(jsonStr);
            return JSON.parse(jsonStr);
}


(async () => {
const response = await got(
    "localhost",
    {
        searchParams: {
        acao: "status_atendente",
        id_cliente: "1234",
        token: "fG5Yd",
        id_atendente: "72455"
        }
    }
    );
    console.log(response.body);
    // mandar esse responde.body pro front mostrar essas infos na tela
})();


exports.getCampanha = async function (req, res, next) { //Rodar ao acessar a página '/'
    const queryObject = url.parse(req.url,true).query;
    console.log(queryObject);
    console.log('que')
    try{        
        const listTabulacao = await got(
            "localhost",
            {
              searchParams: {
                acao: "lista_tabulacao",
                id_cliente: "1234",
                token: "fG5Yd"
              }
            }
        );

        if (listTabulacao !== null) {
            console.log('entrou');
            
            var teste = jsonEncoder(listTabulacao);
            console.log('tey')
            console.log(teste);
            // ------------------------------------------------------------------
            // MANDAR O json 'RECEBIDO' PRO BANCO E SALVAR QUE ISSO FOI ATIVO, CLICADO
            // ------------------------------------------------------------------


            }
        return res.status(200)
    } catch (e){
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.attTabulacao = async function (req, res, next) { // ISSO AQUI TEM QUE SER ATIVO POR UM BOTAO
    const queryObject = url.parse(req.url,true).query;
    try{        
        const attTabulacao = await got(
            "localhost",
            {
                searchParams: {
                acao: "atualiza_tabulacao_contato",
                id_campanha: queryObject.id_campanha,
                id_tabulacao: 185271,
                id_contato_campanha: queryObject.id_contato,
                id_cliente: "1234",
                token: "fG5Yd"
                }
            }
            );
        
            // ------------------------------------------------------------------
            // MANDAR O ID_CONTATO PRO BANCO E SALVAR QUE ISSO FOI ATIVO, CLICADO
            // ------------------------------------------------------------------

        return res.status(200)
    } catch (e){
        return res.status(400).json({ status: 400, message: e.message });
    }
}

cron.schedule("*/5 * * * * *", function() { // começar a rodar qndo acessar o '/'
    (async () => {
      try {
        const status = await got(
          "localhost",
          {
            searchParams: {
              acao: "status_atendente",
              id_cliente: "1234",
              token: "fG5Yd",
              id_atendente: "72455"
            }
          }
        );
        console.log(status.body)
            // ------------------------------------------------------------------
            // MANDAR O status pro front
            // ------------------------------------------------------------------

      } catch (error) {
        console.log(error.response.body);
      }
    })();
  });
  