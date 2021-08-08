const Binance = require('node-binance-api'),
  cfg = require('./config'),
  log = console.log,
  fetch = require('node-fetch'),
  binance = new Binance().options({
    APIKEY: cfg.APIKEY,
    APISECRET: cfg.APISECRET,
  });
function getAllMarkets(callback) {
  return binance.prices((error, ticker) => {
    try {
      callback(ticker);
    } catch (error) {
      log(error);
      //callback(error);
    }
  });
}
const WAIT_NEXT_FETCHING = 3000; // 1 second
async function syncPrices() {
  try {
    getAllMarkets((markets) => {
      global.MARKETS = markets;
      log(
        '%s: waiting after %s',
        new Date().toLocaleString(),
        WAIT_NEXT_FETCHING
      );
      log(markets.BTCUSDT);
      //setTimeout(async () => await run(), WAIT_NEXT_FETCHING);
    });
  } catch (error) {
    log(error);
    log(
      '%s: waiting after %s',
      new Date().toLocaleString(),
      WAIT_NEXT_FETCHING
    );
    //setTimeout(async () => await run(), WAIT_NEXT_FETCHING);
  }
}
const fetchPriceFrom3rdParty = require('./cmc.crawler').fetchPriceFrom3rdParty;
async function syncPriceExtraMarkets() {
  if (global.EXTRAMARTKETS.length > 0) {
    log('Extra Markets:, %s', global.EXTRAMARTKETS);
    await Promise.all(
      global.EXTRAMARTKETS.map(
        async (market) =>
          (global.MARKETS[market] = await fetchPriceFrom3rdParty(market))
      )
    ).then(() => {
      log('done sync extra market');
    });
  } else {
    log('No Extra market');
  }
  setTimeout(() => syncPriceExtraMarkets(), 5000);
}
async function initStatistics() {
  global.EXTRAMARTKETS = [];
  let env = process.env.NODE_ENV || 'development';
  setTimeout(async () => {
    let outerBinanceSymbols = (
      await (
        await fetch(cfg[env].localApiUrl + '/statistics/outerbinance')
      ).json()
    )['symbols'];
    //log(outerBinanceSymbols);
    let binanceSymbols = (
      await (await fetch(cfg[env].localApiUrl + '/statistics/binance')).json()
    )['symbols'];
    //log(binanceSymbols);

    global.BNBSYMBOLS = {};
    global.OUTERBNBSYMBOLS = {};
    outerBinanceSymbols.forEach((symbol) => {
      global.OUTERBNBSYMBOLS[symbol] = true;
    });
    binanceSymbols.forEach((symbol) => {
      global.BNBSYMBOLS[symbol] = true;
    });
  }, 5000);
}
module.exports = {
  getAllMarkets,
  syncPrices,
  syncPriceExtraMarkets,
  initStatistics,
};
(async () => {
  // let ticker = await binance.markets();
  // log(ticker);
  // console.info(`Price of BNB: ${ticker.BNBUSDT}`);
  // let cryptoNames = [
  //   'BTCUSDT',
  //   'ETHUSDT',
  //   'BNBUSDT',
  //   'XRPUSDT',
  //   'MATICUSDT',
  //   'ADAUSDT',
  //   'TLMUSDT',
  //   'BTTUSDT',
  //   'WINUSDT',
  // ];
  // cryptoNames.forEach((market) => {
  //   getPrice(market);
  // });
  // binance.markets('BNBUSDT', (error, ticker) => {
  //   console.info('Price of BNB: ', ticker.BNBUSDT);
  //   console.log(ticker);
  // });
  // binance.useServerTime(() =>
  //   binance.balance((error, balances) => {
  //     if (error) return console.error(error.body);
  //     console.log('balances()', balances);
  //     if (typeof balances.ETH !== 'undefined')
  //       console.log('ETH balance: ', balances.BNB.available);
  //   })
  // );
})();
