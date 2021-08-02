const log = console.log,
  fetch = require('node-fetch'),
  crawler = require('../binance.crawler');

function fetchPrice(req, res) {
  try {
    let market = req.params.market;
    res.send(global.PRICES[market]);
  } catch (error) {
    log(error);
    res.send(error);
  }
}
function fetchPrices(req, res) {
  try {
    let markets = req.params.markets.split(',');
    let prices = {};
    markets.forEach(
      (market) => (prices[market] = global.PRICES[market])
    );
    res.send(prices);
  } catch (error) {
    log(error);
    res.send(error);
  }
}
function fetchAllPrices(_, res) {
  try {
    res.send(global.PRICES);
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
