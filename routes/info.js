const express = require('express'),
  router = express.Router(),
  infoHandler = require('../handlers/infoHandler');

router.get('/price/:market', infoHandler.fetchPrice);
router.get('/prices/:markets', infoHandler.fetchPrices);
router.get('/prices/allmarkets', infoHandler.fetchAllPrices);
module.exports = router;
