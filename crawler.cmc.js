const log = console.log,
  fetch = require('node-fetch');
//coins = require('./coin.map.key.symbol.value.name')
// ==> https://http-api.livecoinwatch.com
// async function fetchPriceFrom3rdParty(market) {
//   try {
//     let url =
//       'https://http-api.livecoinwatch.com/coins/history/range?' +
//       new URLSearchParams({
//         coin: market.substring(0, market.length - 4),
//         start: new Date().getTime() - 600000,
//         end: new Date().getTime(),
//         currency: market.substr(market.length - 4, 3),
//       });
//     //log(url);
//     const response = await fetch(url);
//     const prices = await response.json();
//     const index = prices.data.length === 0 ? 0 : prices.data.length - 1;
//     let lastPrice = prices.data[index].rate;
//     if (!global.EXTRAMARTKETS.includes(market))
//       global.EXTRAMARTKETS.push(market);
//     global.MARKETS[market] = lastPrice + '';
//     return lastPrice;
//   } catch (error) {
//     log(market);
//     log(error);
//   }
// }
/**
 *
 * @param {*} market
 * @returns max price + min price of first ten market pairs
 */

// ==> https://api.coinmarketcap.com
// async function fetchPriceFrom3rdParty(market) {
//   try {
//     let url =
//       'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/market-pairs/latest?' +
//       new URLSearchParams({
//         start: 1,
//         limit: 10,
//         slug: market.substring(0, market.length - 4),
//       });
//     log(url);
//     const response = await fetch(url);
//     const data = (await response.json()).data;
//     const marketPairs = data.marketPairs;
//     // Find max price
//     let maxPrice = Math.max.apply(
//       Math,
//       marketPairs.map(function (market) {
//         return market.price;
//       })
//     );
//     log('maxPrice: %s', maxPrice);
//     let minPrice = Math.min.apply(
//       Math,
//       marketPairs.map(function (market) {
//         return market.price;
//       })
//     );
//     log('minPrice: %s', minPrice);
//     // Find market pair has hightest price
//     // const maxMarketPair = marketPairs.reduce(function(prev, current) {
//     //   return (prev.price > current.price) ? prev : current
//     // })
//     // log(maxMarketPair)
//     let avgPrice = (maxPrice + minPrice) / 2;
//     log('avgPrice: %s', avgPrice);
//     return avgPrice;
//   } catch (error) {
//     log(market);
//     log(error);
//   }
// }
//
// ==> https://api.coinmarketcap.com
async function fetchPriceFrom3rdParty(market) {
  let symbol = market.substring(0, market.length - 4);
  //log(symbol)
  let name = global.OBJECT_SYMBOLS[symbol];
  //log(name)
  try {
    let url =
      'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/market-pairs/latest?' +
      new URLSearchParams({
        start: 1,
        limit: 20,
        slug: name,
      });
    //log(url);
    const response = await fetch(url);
    const data = (await response.json()).data;
    //log(data)
    const marketPairs = data.marketPairs;
    let totalPriceAllMarketPairs = 0;
    marketPairs.forEach(({ price }) => (totalPriceAllMarketPairs += price));
    const avegarePrice = totalPriceAllMarketPairs / marketPairs.length;
    //log(avegarePrice);
    if (!global.EXTRAMARTKETS.includes(market))
      global.EXTRAMARTKETS.push(market);
    global.MARKETS[market] = avegarePrice;
    return avegarePrice;
  } catch (error) {
    log(market);
    log(error);
    return 0;
  }
}
module.exports = { fetchPriceFrom3rdParty };
// (async () => {
//   fetchPriceFrom3rdParty('SAFEMOONUSDT');
// })();
