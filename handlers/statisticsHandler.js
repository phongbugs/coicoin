/**
 * Return value is :
 * {
 *      quantity: 1234,
 *      symbols : ['BTC', 'BNB'],
 * }
 */
const getAllMarkets = require('../crawler.binance').getAllMarkets,
  log = console.log,
  fetchAllBinanceSymbolCoins = (callback) => {
    try {
      getAllMarkets((markets) => {
        //log(markets)
        var listBinanceSymbols = [];
        for (market in markets) {
          let btc = market.substr(market.length - 3, 3);
          if (btc === 'BTC') {
            let coinSymbol = market.substring(0, market.length - 3);
            listBinanceSymbols.push(coinSymbol);
          }
        }
        //log(listBinanceSymbols)
        callback(listBinanceSymbols);
      });
    } catch (error) {
      log(error);
    }
  },
  getAllCMCSymbolCoins = async () => {
    try {
      // const response = await fetch(
      //   'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?' +
      //     new URLSearchParams({
      //       start: 1,
      //       limit: 6141,
      //       sortBy: 'market_cap',
      //       sortType: 'desc',
      //       convert: 'USD,BTC,ETH',
      //     })
      // );
      // const symbols = (await response.json()).data.cryptoCurrencyList.map(
      //   (coin) => coin.symbol
      // );

      // const data = require('../cmc.raw.js')
      // log(data)
      // const symbols = require('../cmc.raw.js').data.cryptoCurrencyList.map(
      //   (coin) => coin.symbol
      // );
      //log(symbols)
      return global.ARRAY_SYMBOLS;
    } catch (error) {
      log(error);
    }
  },
  fetchOuterSymbolsBinance = (callback) => {
    try {
      fetchAllBinanceSymbolCoins(async (binanceSymbols) => {
        let cmcSymbols = await getAllCMCSymbolCoins();
        //log(cmcSymbols)
        //https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848
        let outerBinanceSymbols = cmcSymbols.filter(
          (x) => !binanceSymbols.includes(x)
        );
        //log(outerBinanceSymbols)
        callback(outerBinanceSymbols);
      });
    } catch (error) {
      log(error);
    }
  },
  getBinanceSymbols = async (_, res) => {
    try {
      fetchAllBinanceSymbolCoins((symbols) => {
        //log(symbols)
        res.send({ quantity: symbols.length, symbols: symbols });
      });
    } catch (error) {
      log(error);
    }
  },
  getCMCSymbols = async (_, res) => {
    let symbols = await getAllCMCSymbolCoins();
    //log(symbols)
    res.send({ quantity: symbols.length, symbols: symbols });
  },
  getOuterSymbolsBinance = (_, res) => {
    fetchOuterSymbolsBinance((symbols) => {
      res.send({ quantity: symbols.length, symbols: symbols });
    });
  },
  /**
   * OBJECT_SYMBOLS = {"BTC":"Bitcoin", "ETH":"Etherum"};
   * ARRAY_SYMBOLS = ["BTC", "ETH"}];
   */
  updateObjectSymbols = (req, res) => {
    try {
      log(req.body.symbols)
      let symbols = JSON.parse(req.body.symbols);
      global.OBJECT_SYMBOLS = symbols;
      res.send({ success: true, message: 'Object Symbols updated' });
    } catch (error) {
      log(error)
      res.send({ success: false, message: error.message });
    }
  },
  updateArraySymbols = (req, res) => {
    try {
      log(req.body.symbols)
      let symbols = JSON.parse(req.body.symbols);
      global.ARRAY_SYMBOLS = symbols;
      res.send({ success: true, message: 'Array Symbols updated' });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  };

module.exports = {
  getBinanceSymbols,
  getCMCSymbols,
  getOuterSymbolsBinance,
  updateArraySymbols,
  updateObjectSymbols,
};
