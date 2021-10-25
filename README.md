# coicoin"

## Change log

***All notable changes to this project will be documented in this part.***

## [0.0.2r9]

### Added

### Fixed

- Face to length body params of http post, symbols is very long will show error ```<pre>Error: No default engine was specified and no extension was provided.<br> &nbsp; &nbsp;at new View```
  --> Fix by using ```form data``` to send large json (remeber use ```formidable``` module together)
  
  ```js
  let url =
    cfg[env].localApiUrl + '/statistics/update-cmc-symbols-object-type';
  log(url);
  let symbols = JSON.stringify(mapToSymbolKeyName(cryptoCurrencyList));
  let body = JSON.stringify({
    symbols: symbols,
  });
  let responseApi = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });
  ```

### Change

- Remove "save online" button
- Remove refresh button and countdown
- Remove pair text box
- Re-design folder struct:
  - screens :
    - wallet
    - analysis
    - donate

## [0.0.1]

**First release:**

- Screen : <http://prntscr.com/1svyvcq> <http://prntscr.com/1svz667>
- Wallet App
  - Wallet Screen
    - Add coin popup
    - Coin List
    - Coin widgets
      - On/Off DCA Mode widget
      - Show/Price widget
      - Show/Hide % widget
      - Sort widget
- Service
  - Sync BNB Markets
    - Sync Outer BNB Markets (Extra Market)
    - Api get market...
