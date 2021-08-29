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
        log('==> Done Syncing BNBMARTKETS...');
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
        log('Syncing EXTRAMARTKETS: %s', global.EXTRAMARTKETS);
        await Promise.all(
          global.EXTRAMARTKETS.map(
            async (market) =>
              (global.MARKETS[market] = await cmcCrawler.fetchPriceFrom3rdParty(
                market
              ))
          )
        ).then(() => {
          log('==> Done Syncing EXTRAMARTKETS');
        });
      } else {
        log('EXTRAMARTKETS NODATA');
      }
    }, TIMEOUT_SYNC_EXTRAMARKET);
    //setTimeout(() => syncExtraMarkets(), TIMEOUT_SYNC_EXTRAMARKET);
  } catch (error) {
    log('==> syncExtraMarkets error:');
    log(error);
  }
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
  syncBNBMarkets,
  syncExtraMarkets,
  initStatistics,
};
