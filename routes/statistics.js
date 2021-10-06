const express = require('express'),
  router = express.Router(),
  statisticsHandler = require('../handlers/statisticsHandler');

router.get('/binance-symbols', statisticsHandler.getBinanceSymbols);
router.get('/cmc-symbols', statisticsHandler.getCMCSymbols);
router.get('/outer-binance-symbols', statisticsHandler.getOuterSymbolsBinance);
router.post('/update-cmc-symbols-array-type', statisticsHandler.updateArraySymbols);
router.post('/update-cmc-symbols-object-type', statisticsHandler.updateObjectSymbols);
module.exports = router;
