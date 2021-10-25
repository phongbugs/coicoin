/* Service sync price */
const cfg = require('./config'),
  log = console.log,
  env = process.env.NODE_ENV || 'development',
  cmcCrawler = require('./crawler.cmc'),
  binanceCrawler = require('./crawler.binance'),
  fetch = require('node-fetch'),
  TIMEOUT_SYNC_BNBMARKET = cfg[env].TIMEOUT_SYNC_BNBMARKET,
  TIMEOUT_SYNC_EXTRAMARKET = cfg[env].TIMEOUT_SYNC_EXTRAMARKET,
  TIMEOUT_START_INIT_SYMBOLS = cfg[env].TIMEOUT_START_INIT_SYMBOLS;

async function syncBNBMarkets() {
  try {
    setInterval(async () => {
      //log('Syncing BNBMARTKETS...');
      binanceCrawler.getAllMarkets((markets) => {
        global.MARKETS = markets;
        log('==> Synced BNBMARTKETS...');
      });
    }, TIMEOUT_SYNC_BNBMARKET);
  } catch (error) {
    log('==> syncBNBMarkets error:');
    log(error);
  }
}

async function syncExtraMarkets() {
  try {
    setInterval(async () => {
      if (global.EXTRAMARTKETS.length > 0) {
        //log('Syncing EXTRAMARTKETS: %s', global.EXTRAMARTKETS);
        await Promise.all(
          global.EXTRAMARTKETS.map(
            async (market) =>
              (global.MARKETS[market] = await cmcCrawler.fetchPriceFrom3rdParty(
                market
              ))
          )
        ).then(() => {
          log('==> Synced EXTRAMARTKETS');
        });
      } else {
        log('==> EXTRAMARTKETS NODATA');
      }
    }, TIMEOUT_SYNC_EXTRAMARKET);
    //setTimeout(() => syncExtraMarkets(), TIMEOUT_SYNC_EXTRAMARKET);
  } catch (error) {
    log('==> syncExtraMarkets error:');
    log(error);
  }
}

let tokenObject = {
  id: 1,
  name: 2,
  symbol: 3,
};
async function initStatistics() {
  global.ARRAY_SYMBOLS = [];
  global.OBJECT_SYMBOLS = require('./coin.map.key.symbol.value.name');
  global.EXTRAMARTKETS = [];

  // contain price usd of all tokens and coins
  global.BNBMARKETS = {};
  global.CMCMARKETS = {};

  global.BNB_ARRAYS_SYMBOLS = [];
  global.BNB_OBJECTS_SYMBOLS = {};

  global.OUTER_BNB_OBJECT_SYMBOLS = {};

  global.CMC_ARRAYS_SYMBOLS = [];
  global.CMC_OBJECTS_SYMBOLS = {};
  setTimeout(async () => {
    let outerBinanceSymbols = (
      await (
        await fetch(cfg[env].localApiUrl + '/statistics/outer-binance-symbols')
      ).json()
    )['symbols'];
    //log(outerBinanceSymbols);
    let binanceSymbols = (
      await (
        await fetch(cfg[env].localApiUrl + '/statistics/binance-symbols')
      ).json()
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
    log('Initialization');
    //log('global.BNBSYMBOLS: %s', global.BNBSYMBOLS);
    //log('global.OUTERBNBSYMBOLS: %s', global.OUTERBNBSYMBOLS);
    syncBNBMarkets();
    syncExtraMarkets();
  }, TIMEOUT_START_INIT_SYMBOLS);
}

module.exports = {
  syncBNBMarkets,
  syncExtraMarkets,
  initStatistics,
};
