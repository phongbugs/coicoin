const log = console.log,
  fetch = require('node-fetch'),
  fetchPriceFrom3rdParty = require('../crawler.cmc').fetchPriceFrom3rdParty;

async function fetchPrice(req, res) {
  let market = req.params.market;
  try {
    if (global.MARKETS[market]) res.send({ price: global.MARKETS[market] });
    else {
      let lastPrice = await fetchPriceFrom3rdParty(market);
      global.MARKETS[market] = lastPrice;
      res.send({ price: lastPrice });
    }
  } catch (error) {
    log(error);
    throw error;
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
