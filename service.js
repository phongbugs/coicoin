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
    log('Syncing BNBMARTKETS...');
    binanceCrawler.getAllMarkets((markets) => {
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

async function syncExtraMarkets() {
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
  setTimeout(() => syncExtraMarkets(), TIMEOUT_SYNC_EXTRAMARKET);
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
