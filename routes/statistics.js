const express = require('express'),
  router = express.Router(),
  statisticsHandler = require('../handlers/statisticsHandler');

router.get('/binance-symbols', statisticsHandler.getBinanceSymbols);
router.get('/cmc-array-symbols', statisticsHandler.getCMCArraySymbols);
router.get('/cmc-object-symbols', statisticsHandler.getCMCObjectSymbols);
router.get('/outer-binance-symbols', statisticsHandler.getOuterSymbolsBinance);
router.post('/update-cmc-symbols-array-type', statisticsHandler.updateArraySymbols);
router.post('/update-cmc-symbols-object-type', statisticsHandler.updateObjectSymbols);
module.exports = router;
