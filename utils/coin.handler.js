const fs = require('fs');
const log = console.log,
  cols = { id: 'i', symbol: 's', name: 'n', cmcRank: 'r' },
  toJson = ({ data, destFile }, callback) => {
    fs.writeFile(
      './' + destFile,
      'module.exports =' + JSON.stringify(data, null, 0),
      'utf8',
      (err) =>
        err
          ? log(err)
          : callback
          ? callback(destFile)
          : log('saved ' + destFile)
    );
  },
  toCsv = ({ srcFile, destFile }) => {
    const header = [cols.id, cols.symbol, cols.name, cols.cmcRank];
    let csv = [];
    csv.push(header.toString());
    require('./' + srcFile).forEach((record) => {
      let line = '';
      header.forEach((name) => {
        let val = record[name];
        line += (val ? val : -1) + ',';
      });
      csv.push(line);
      //log(line);
    });
    fs.writeFile('./' + destFile, csv.join('\r\n'), 'utf8', (err) =>
      err ? log(err) : log(destFile)
    );
  },
  // has two format type of returned value are either object or array
  readCoins = ({ srcRawDataFile, returnType }) => {
    // this json file get from URL : https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=5604&sortBy=market_cap&sortType=desc&convert=USD,BTC,ETH&cryptoType=all&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply,volume_7d,volume_30d
    // total quantity coins is 1-5604

    let rawdata = fs.readFileSync(srcRawDataFile);
    let data = JSON.parse(rawdata).data;
    let coins = returnType === 'object' ? {} : [];
    for (cryptoCurrency of data.cryptoCurrencyList) {
      // js file size is 380KB
      // let coin = {;
      //   id: cryptoCurrency.id,
      //   name: cryptoCurrency.name,
      //   symbol: cryptoCurrency.symbol,
      //   cmcRank: cryptoCurrency.cmcRank,
      // };

      // minify js file size to 264KB
      let coin = {};
      coin[cols.id] = cryptoCurrency.id;
      coin[cols.name] = cryptoCurrency.name;
      coin[cols.symbol] = cryptoCurrency.symbol;
      coin[cols.cmcRank] = cryptoCurrency.cmcRank;
      if (returnType === 'object') coins[cryptoCurrency.symbol] = coin;
      else coins.push(coin);
    }
    //console.log(coins);
    return coins;
  },
  convertJsonToCsv = ({ srcRawDataFile, destJsonFile, destCsvFile }) => {
    toJson(
      {
        data: readCoins({
          srcRawDataFile: srcRawDataFile,
          returnType: 'array',
        }),
        destFile: destJsonFile,
      },
      (destJsonFile) => {
        log('saved ' + destJsonFile);
        toCsv({ srcFile: destJsonFile, destFile: destCsvFile });
      }
    );
  },
  /**
   * return {"USDT": "Tether", "BNB":"Binance-coin"}
   */
  mapToSymbolKeyName = (srcRawDataFile) => {
    let rawdata = fs.readFileSync(srcRawDataFile);
    let data = JSON.parse(rawdata).data;
    let coins = {};
    for (cryptoCurrency of data.cryptoCurrencyList)
      coins[cryptoCurrency.symbol] = cryptoCurrency.name
        .replace(/[ .]/g, '-')
        .toLowerCase();
    console.log(coins);
    toJson({ data: coins, destFile: './coin.map.name.json' });
    return coins;
  };

(() => {
  //https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png

  //==> Map raw data to array json
  toJson({
    data: readCoins({
      srcRawDataFile: './coin.data.raw.6814.json',
      returnType: 'array',
    }),
    destFile: './coin.map.js',
  });

  //==> Map raw data to object json
  toJson({
    data: readCoins({
      srcRawDataFile: './coin.data.raw.6814.json',
      returnType: 'object',
    }),
    destFile: './coin.map.object.js',
  });

  //==> Convert json array to csv file
  // toCsv({ srcFile: 'coin.map.js', destFile: 'coin.map.csv' });

  //==> Convert raw data to csv file
  // convertJsonToCsv({
  //   srcRawDataFile: './coin.data.raw.6141.json',
  //   destJsonFile: './coin.map.js',
  //   destCsvFile: './coin.map.csv',
  // });
  mapToSymbolKeyName('./coin.data.raw.6814.json');
})();
