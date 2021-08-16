const Binance = require('node-binance-api'),
  cfg = require('./config'),
  log = console.log,
  fetch = require('node-fetch'),
  binance = new Binance().options({
    APIKEY: cfg.APIKEY,
    APISECRET: cfg.APISECRET,
  }),
  env = process.env.NODE_ENV || 'development',
  fetchPriceFrom3rdParty = require('./crawler.cmc').fetchPriceFrom3rdParty;

const TIMEOUT_SYNC_BNBMARKET = cfg[env].TIMEOUT_SYNC_BNBMARKET,
  TIMEOUT_SYNC_EXTRAMARKET = cfg[env].TIMEOUT_SYNC_EXTRAMARKET,
  TIMEOUT_START_INIT_SYMBOLS = cfg[env].TIMEOUT_START_INIT_SYMBOLS;

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

async function syncBNBMarkets() {
  try {
    log('Syncing BNBMARTKETS...');
    getAllMarkets((markets) => {
      global.MARKETS = markets;
      // log(
      //   '%s: waiting after %s',
      //   new Date().toLocaleString(),
      //   TIMEOUT_SYNC_BNBMARKET
      // );
      //log(markets.BTCUSDT);
      log('==> Done Syncing BNBMARTKETS...');
      setTimeout(async () => await syncBNBMarkets(), TIMEOUT_SYNC_BNBMARKET);
    });
  } catch (error) {
    log(error);
    setTimeout(async () => await syncBNBMarkets(), TIMEOUT_SYNC_BNBMARKET);
  }
}

async function syncPriceExtraMarkets() {
  if (global.EXTRAMARTKETS.length > 0) {
    log('Syncing EXTRAMARTKETS: %s', global.EXTRAMARTKETS);
    await Promise.all(
      global.EXTRAMARTKETS.map(
        async (market) =>
          (global.MARKETS[market] = await fetchPriceFrom3rdParty(market))
      )
    ).then(() => {
      log('==> Done Syncing EXTRAMARTKETS');
    });
  } else {
    log('EXTRAMARTKETS NODATA');
  }
  setTimeout(() => syncPriceExtraMarkets(), TIMEOUT_SYNC_EXTRAMARKET);
}

async function initStatistics() {
  global.EXTRAMARTKETS = [];
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
  }, TIMEOUT_START_INIT_SYMBOLS);
}

module.exports = {
  getAllMarkets,
  syncBNBMarkets,
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
