const Binance = require('node-binance-api'),
  cfg = require('./config');
const binance = new Binance().options({
  APIKEY: cfg.APIKEY,
  APISECRET: cfg.APISECRET,
});
const getPrice = (market) => {
  binance.prices(market, (error, ticker) => {
    console.info('Price of %s: %s', market, ticker[market]);
    console.log(ticker);
  });
};
(async () => {
  //   let ticker = await binance.prices();
  //   console.info(`Price of BNB: ${ticker.BNBUSDT}`);
  let cryptoNames = [
    'BTCUSDT',
    'ETHUSDT',
    'BNBUSDT',
    'XRPUSDT',
    'MATICUSDT',
    'ADAUSDT',
    'TLMUSDT',
    'BTTUSDT',
    'WINUSDT',
  ];
  cryptoNames.forEach((market) => {
    getPrice(market);
  });
  // binance.prices('BNBUSDT', (error, ticker) => {
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
