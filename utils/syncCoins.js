const fetch = require('node-fetch'),
  log = console.log,
  fs = require('fs'),
  cfg = require('../config'),
  env = process.env.NODE_ENV || 'development';
async function fetchLatestCoins(latestQuantityCoin) {
  const response = await fetch(
    'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?' +
      new URLSearchParams({
        start: 1,
        limit: latestQuantityCoin || 2,
        sortBy: 'market_cap',
        sortType: 'desc',
        convert: 'USD,BTC,ETH',
      })
  );
  let cryptoCurrencyList = (await response.json()).data.cryptoCurrencyList;

  // update-cmc-symbols-object-type
  let urlO = cfg[env].localApiUrl + '/statistics/update-cmc-symbols-object-type';
  log(urlO);
  let symbolsO = JSON.stringify(mapToSymbolKeyName(cryptoCurrencyList));
  log(symbolsO);
  let responseApiO = await fetch(urlO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      symbols: symbolsO,
    }),
  });
  log(await responseApiO.text());
   
  // update-cmc-symbols-array-type
  let urlA = cfg[env].localApiUrl + '/statistics/update-cmc-symbols-array-type';
  log(urlA);
  let symbolsA = JSON.stringify(cryptoCurrencyList.map((coin) => coin.symbol));
  log(symbolsA);
  let responseApiA = await fetch(urlA, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      symbols: symbolsA,
    }),
  });
  log(await responseApiA.text());

  // save to static file symbol coin API
  toJson({
    data: mapToSymbolKeyName(cryptoCurrencyList),
    destFile: '../coin.map.key.symbol.value.name.js',
  });

  // save coin list combobox web app
  toJson({
    data: convertCoin(cryptoCurrencyList, 'array'),
    isEs6Export: true,
    destFile: '../web/src/data/coin.map.js',
  });
}

let mapToSymbolKeyName = (cryptoCurrencyList) => {
  let coins = {};
  for (cryptoCurrency of cryptoCurrencyList)
    coins[cryptoCurrency.symbol] = cryptoCurrency.name
      .replace(/[ .]/g, '-')
      .toLowerCase();
  return coins;
};
let convertCoin = (cryptoCurrencyList, returnType) => {
  let coins = returnType === 'object' ? {} : [];
  for (cryptoCurrency of cryptoCurrencyList) {
    // minify js file size to 264KB
    let coin = {},
      cols = { id: 'i', symbol: 's', name: 'n', cmcRank: 'r' };
    coin[cols.id] = cryptoCurrency.id;
    coin[cols.name] = cryptoCurrency.name;
    coin[cols.symbol] = cryptoCurrency.symbol;
    coin[cols.cmcRank] = cryptoCurrency.cmcRank;
    if (returnType === 'object') coins[cryptoCurrency.symbol] = coin;
    else coins.push(coin);
  }
  //console.log(coins);
  return coins;
};
let toJson = ({ data, destFile, isEs6Export }, callback) => {
  fs.writeFile(
    './' + destFile,
    `${isEs6Export ? 'export const Coins' : 'module.exports '} = ` +
      JSON.stringify(data, null, 0),
    'utf8',
    (err) =>
      err ? log(err) : callback ? callback(destFile) : log('saved ' + destFile)
  );
};

(async () => {
  let latestQuantityCoin = process.argv[2];
  fetchLatestCoins(latestQuantityCoin);
})();
