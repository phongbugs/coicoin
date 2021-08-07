const express = require('express'),
  router = express.Router(),
  statisticsHandler = require('../handlers/statisticsHandler');

router.get('/binance', statisticsHandler.getInfoBinance);
router.get('/coinmarketcap', statisticsHandler.getInfoCoinmarketcap);
router.get('/outerbinance', statisticsHandler.getInfoOuterBinance);
module.exports = router;
