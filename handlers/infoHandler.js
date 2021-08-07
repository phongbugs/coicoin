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
    log(url);
    const response = await fetch(url);
    const prices = await response.json();
    log(prices);
    let lastPrice = prices.data[0].rate;
    global.MARKETS[market] = lastPrice + '';
    log(lastPrice);
    return lastPrice;
  } catch (error) {
    log(market);
    log(error);
  }
}

async function fetchPrice(req, res) {
  let market = req.params.market;
  try {
    // let price = global.MARKETS[market];
    // log(price);
    if (global.MARKETS[market]) res.send(global.MARKETS[market]);
    else {
      let url =
        'https://http-api.livecoinwatch.com/coins/history/range?' +
        new URLSearchParams({
          coin: market.substring(0, market.length - 4),
          start: new Date().getTime() - 600000,
          end: new Date().getTime(),
          currency: market.substr(market.length - 4, 3),
        });
      log(url);
      const response = await fetch(url);
      const prices = await response.json();
      log(prices);
      let lastPrice = prices.data[0].rate;
      global.MARKETS[market] = lastPrice + '';
      log(lastPrice);
      res.send(lastPrice.toString());
    }
  } catch (error) {
    log(market);
    log(error);
    //res.send(error);
  }
}
async function fetchPrices(req, res) {
  try {
    let markets = req.params.markets.split(',');
    let prices = {};
    Promise.all(
      markets.map(async (market) => {
        if (global.MARKETS[market]) prices[market] = global.MARKETS[market];
        else prices[market] = await fetchPriceFrom3rdParty(market);
      })
    ).then(() => {
      res.send(prices);
    });
  } catch (error) {
    log(error);
    res.send(error);
  }
}
function fetchAllPrices(_, res) {
  try {
    res.send(global.MARKETS);
  } catch (error) {
    log(error);
    res.send(error);
  }
}

module.exports = {
  fetchPrice,
  fetchPrices,
  fetchAllPrices,
};
