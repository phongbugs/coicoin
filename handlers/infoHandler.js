const log = console.log,
  fetch = require('node-fetch'),
  fetchPriceFrom3rdParty = require('../crawler.cmc').fetchPriceFrom3rdParty;

// Use for add new coin/token
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

// use for sync price of list coin/token
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
      log(prices)
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
function fetchBNBMarkets(_, res) {
  try {
    res.send(global.BNBSYMBOLS);
  } catch (error) {
    log(error);
    res.send(error);
  }
}

function fetchBNBOuterMarkets(_, res) {
  try {
    res.send(global.EXTRAMARTKETS);
  } catch (error) {
    log(error);
    res.send(error);
  }
}


module.exports = {
  fetchPrice,
  fetchPrices,
  fetchAllPrices,
  fetchBNBMarkets,
  fetchBNBOuterMarkets
};
