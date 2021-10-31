const fetch = require('node-fetch'),
  log = console.log,
  fs = require('fs'),
  FormData = require('form-data'),
  cfg = require('../config'),
  env = process.env.NODE_ENV || 'development';
async function fetchLatestCoins(latestQuantityCoin) {
  let url =
    'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?' +
    new URLSearchParams({
      start: 1,
      limit: latestQuantityCoin || 2,
      sortBy: 'market_cap',
      sortType: 'desc',
      convert: 'USD,BTC,ETH',
    });
  // 'https://api.coinmarketcap.com/data-api/v3/map/all?' +
  // new URLSearchParams({
  //   listing_status: 'active',
  //   exchangeAux: 'is_active,status',
  //   cryptoAux: 'is_active,status',
  //   start: 1,
  //   limit: latestQuantityCoin || 2,
  // });

  log(url);
  const response = await fetch(url);
  //old url
  let cryptoCurrencyList = (await response.json()).data.cryptoCurrencyList;
  // new url
  //let cryptoCurrencyList = (await response.json()).data.exchangeMap;
  // save to raw file
  toRawJson({
    data: cryptoCurrencyList,
    destFile: './coin.data.raw.' + cryptoCurrencyList.length + '.json',
  });
  //update-cmc-symbols-object-type
  await updateObjectSymbols(cryptoCurrencyList);

  // update-cmc-symbols-array-type
  await updateArraySymbols(cryptoCurrencyList);

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

// use form data for large json content
let updateObjectSymbols = async (cryptoCurrencyList) => {
  let url = cfg[env].localApiUrl + '/statistics/update-cmc-symbols-object-type';
  log(url);
  let symbols = JSON.stringify(mapToSymbolKeyName(cryptoCurrencyList));
  const form = new FormData();
  form.append('symbols', symbols);
  let responseApi = await fetch(url, {
    method: 'POST',
    body: form,
  });
  log(await responseApi.text());
};
let updateArraySymbols = async (cryptoCurrencyList) => {
  let url = cfg[env].localApiUrl + '/statistics/update-cmc-symbols-array-type';
  log(url);
  let symbols = JSON.stringify(cryptoCurrencyList.map((coin) => coin.symbol));
  //log(symbols);
  const form = new FormData();
  form.append('symbols', symbols);
  let responseApi = await fetch(url, {
    method: 'POST',
    body: form,
  });
  log(await responseApi.text());
};

let mapToSymbolKeyName = (cryptoCurrencyList) => {
  let coins = {};
  for (cryptoCurrency of cryptoCurrencyList)
    coins[cryptoCurrency.symbol] = cryptoCurrency.name
      .replace(/[ .-]/g, '-')
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
        err
          ? log(err)
          : callback
          ? callback(destFile)
          : log('saved ' + destFile)
    );
  },
  toRawJson = ({ data, destFile }) => {
    fs.writeFile(
      './' + destFile,
      JSON.stringify(data, null, 0),
      'utf8',
      (err) => (err ? log(err) : log('saved ' + destFile))
    );
  };

// convert to markets pairs as binance
// {"BTCUSDT":55555, ETHUSDT:4444}
// let mutateToMarkets = (cryptoCurrencyList) => {
//   let markets = cryptoCurrencyList.map(currentcy => {
//     let market = currentcy.symbol
//   })
// }
(async () => {
  let latestQuantityCoin = process.argv[2];
  fetchLatestCoins(latestQuantityCoin);
})();
