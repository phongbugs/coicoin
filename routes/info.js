const express = require('express'),
  router = express.Router(),
  infoHandler = require('../handlers/infoHandler');

router.get('/price/:market', infoHandler.fetchPrice);
router.get('/prices/:markets', infoHandler.fetchPrices);
router.get('/prices/markets/all', infoHandler.fetchAllPrices);
router.get('/markets/outerbnb', infoHandler.fetchBNBOuterMarkets);
router.get('/markets/bnb', infoHandler.fetchBNBMarkets);
module.exports = router;
