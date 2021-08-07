const Binance = require('node-binance-api'),
  cfg = require('./config'),
  log = console.log;
const binance = new Binance().options({
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
async function run() {
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
    setTimeout(async () => await run(), WAIT_NEXT_FETCHING);
  }
}

module.exports = {
  getAllMarkets,
  run,
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
