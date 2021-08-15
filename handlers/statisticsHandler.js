/**
 * Return value is :
 * {
 *      quantity: 1234,
 *      symbols : ['BTC', 'BNB'],
 * }
 */
const getAllMarkets = require('../crawler.binance').getAllMarkets,
  log = console.log,
  fetch = require('node-fetch'),
  fetchBinanceSymbolCoins = (callback) => {
    try {
      getAllMarkets((markets) => {
        var listBinanceSymbols = [];
        for (market in markets) {
          let usdt = market.substr(market.length - 4, 4);
          if (usdt === 'USDT') {
            let coinSymbol = market.substring(0, market.length - 4);
            listBinanceSymbols.push(coinSymbol);
          }
        }
        callback(listBinanceSymbols);
      });
    } catch (error) {
      log(error);
    }
  },
  fetchCoinmarketcapSymbolCoins = async () => {
    try {
      const response = await fetch(
        'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?' +
          new URLSearchParams({
            start: 1,
            limit: 5952,
            sortBy: 'market_cap',
            sortType: 'desc',
            convert: 'USD,BTC,ETH',
          })
      );
      const symbols = (await response.json()).data.cryptoCurrencyList.map(
        (coin) => coin.symbol
      );
      return symbols;
    } catch (error) {
      log(error);
    }
  },
  fetchOuterBinanceSymbols = (callback) => {
    try {
      fetchBinanceSymbolCoins(async (binanceSymbols) => {
        let cmcSymbols = await fetchCoinmarketcapSymbolCoins();
        //https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848
        let outerBinanceSymbols = cmcSymbols.filter(
          (x) => !binanceSymbols.includes(x)
        );
        callback(outerBinanceSymbols);
      });
    } catch (error) {
      log(error);
    }
  },
  getInfoBinance = async (_, res) => {
    try {
      fetchBinanceSymbolCoins((symbols) => {
        res.send({ quantity: symbols.length, symbols: symbols });
      });
    } catch (error) {
      log(error);
    }
  },
  getInfoCoinmarketcap = async (_, res) => {
    let symbols = await fetchCoinmarketcapSymbolCoins();
    res.send({ quantity: symbols.length, symbols: symbols });
  },
  getInfoOuterBinance = (_, res) => {
    fetchOuterBinanceSymbols((symbols) => {
      res.send({ quantity: symbols.length, symbols: symbols });
    });
  };

module.exports = {
  getInfoBinance,
  getInfoCoinmarketcap,
  getInfoOuterBinance,
  fetchOuterBinanceSymbols,
};
