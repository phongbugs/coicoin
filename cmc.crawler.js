const log = console.log,
  fetch = require('node-fetch');
async function fetchPriceFrom3rdParty(market) {
  try {
    let url =
      'https://http-api.livecoinwatch.com/coins/history/range?' +
      new URLSearchParams({
        coin: market.substring(0, market.length - 4),
        start: new Date().getTime() - 600000,
        end: new Date().getTime(),
        currency: market.substr(market.length - 4, 3),
      });
    const response = await fetch(url);
    const prices = await response.json();
    let lastPrice = prices.data[0].rate;
    if (!global.EXTRAMARTKETS.includes(market))
      global.EXTRAMARTKETS.push(market);
    global.MARKETS[market] = lastPrice + '';
    return lastPrice;
  } catch (error) {
    log(market);
    log(error);
  }
}

module.exports = { fetchPriceFrom3rdParty };
