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
    const header = [
      cols.id,
      cols.symbol,
      cols.name,
      cols.cmcRank,
      //'maxSupply',
      //'isActive'
    ];
    let csv = [];
    csv.push(header.toString());
    require('./' + srcFile).forEach((s) => {
      let line = '';
      header.forEach((name) => {
        let mark = s[name];
        line += (mark ? mark : -1) + ',';
      });
      csv.push(line);
      //log(line);
    });
    fs.writeFile('./' + destFile, csv.join('\r\n'), 'utf8', (err) =>
      err ? log(err) : log(destFile)
    );
  },
  // has two format type of returned value are either object or array
  readCoins = (type) => {
    // this json file get from URL : https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=5604&sortBy=market_cap&sortType=desc&convert=USD,BTC,ETH&cryptoType=all&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply,volume_7d,volume_30d
    // total quantity coins is 1-5604
    let rawdata = fs.readFileSync('./crypto_coin_data.json');
    let data = JSON.parse(rawdata).data;
    let coins = type === 'object' ? {} : [];
    for (cryptoCurrency of data.cryptoCurrencyList) {
      // let coin = {
      //   id: cryptoCurrency.id,
      //   name: cryptoCurrency.name,
      //   symbol: cryptoCurrency.symbol,
      //   cmcRank: cryptoCurrency.cmcRank,
      // };
      let coin = {}
      coin[cols.id] = cryptoCurrency.id
      coin[cols.name] = cryptoCurrency.name
      coin[cols.symbol] = cryptoCurrency.symbol
      coin[cols.cmcRank] = cryptoCurrency.cmcRank
      if (type === 'object') coins[cryptoCurrency.symbol] = coin;
      else coins.push(coin);
    }
    //console.log(coins);
    return coins;
  },
  convertJsonToCsv = () => {
    toJson(
      { data: readCoins('array'), destFile: 'coin.map.js' },
      (destFile) => {
        log('saved ' + destFile);
        toCsv({ srcFile: 'coin.map.js', destFile: 'coin.map.csv' });
      }
    );
  };

(() => {
  //https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png
  //toJson({ data: readCoins('array'), destFile: 'coin.map.js' });
  //toCsv({ srcFile: 'coin.map.js', destFile: 'coin.map.csv' });
  convertJsonToCsv();
  toJson({ data: readCoins('object'), destFile: 'coin.map.object.js' });
})();
