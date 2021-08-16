import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import CoinComboBox from './components/CoinComboBox';
import CoinTextField from './components/CoinTextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import SyncIcon from '@material-ui/icons/Sync';
import Button from '@material-ui/core/Button';
import CoinList from './components/CoinList';
import PairComboBox from './components/PairComboBox';
import { makeStyles } from '@material-ui/core/styles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  addCoin,
  updateCoins,
  hidePrice,
  showPrice,
  hidePercent,
  showPercent,
  backupMarkets,
} from './redux/slice';
import { Coins } from './data/coin.map';
import fetch from 'node-fetch';
import Switcher from './components/Switcher';
import CountDown from './components/CountDown';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    padding: '10px',
  },
  button: {
    backgroundColor: '#468446',
    color: '#821515',
  },
  btnCoin: {
    height: '39px',
    background: '#2c732c',
    color: 'rgb(222 222 222)',
    fontWeight: 'bold',
  },
}));
const log = console.log;

const fetchPrice = async (market) => {
  let url = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(url + 'info/price/' + market);
    const price = (await response.json())['price'];
    return +price;
  } catch (error) {
    log(error);
    //alert('API Service error');
    throw error;
  }
};

const fetchPrices = async (markets) => {
  let url = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(
      url + 'info/prices/' + [...new Set(markets)].toString()
    );
    const prices = await response.json();
    return prices;
  } catch (error) {
    log(error);
    //alert(error.message);
  }
};

const getCoinsWithNewPrices = async (coins) => {
  try {
    let prices = await fetchPrices(coins.map((coin) => coin.s + coin.p));
    if (prices)
      return coins.map((coin) => {
        let market = coin.s + coin.p;
        let currentFund = coin.cf;
        let price = prices[market];
        if (price) currentFund = coin.q * price;
        let c = { ...coin, cf: currentFund, price: price };
        return c;
      });
    return coins;
  } catch (error) {
    alert('API Error');
    log(error);
  }
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantityCoin, setQuantityCoin] = useState('');
  const [originalFund, setOriginalFund] = useState('');
  const [symbolCoin, setSymbolCoin] = useState('');
  const [modeDCA, setModeDCA] = useState('');
  const [symbolCoinPair, setSymbolCoinPair] = useState('USDT');
  const [countRefresh, setCountRefresh] = useState(
    process.env.REACT_APP_SYNC_PRICE_TIMEOUT / 1000
  );
  let { currentState } = useSelector(
    (state) => ({ currentState: state.coin }),
    shallowEqual
  );
  // => Custom setInterval to update state
  // src tutorial : https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  // src code : https://codesandbox.io/s/105x531vkq?file=/src/index.js:37-43
  useInterval(async () => {
    if (currentState.entities.length > 0) {
      dispatch(backupMarkets());
      dispatch(updateCoins(await getCoinsWithNewPrices(currentState.entities)));
    }
  }, process.env.REACT_APP_SYNC_PRICE_TIMEOUT);

  useEffect(() => {
    async function updatePriceStartingApp() {
      dispatch(updateCoins(await getCoinsWithNewPrices(currentState.entities)));
    }
    setDefaultConfigs();
    updatePriceStartingApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function setDefaultConfigs() {
    setModeDCA('on');
  }
  const sendSymbol = (symbol) => {
    setSymbolCoin(symbol);
  };
  const sendSymbolPair = (symbol) => {
    setSymbolCoinPair(symbol);
  };
  const sendModeDCA = (mode) => {
    setModeDCA(mode);
  };
  const sendModePrice = (mode) => {
    if (mode === 'on') dispatch(showPrice());
    else dispatch(hidePrice());
  };
  const sendModePercent = (mode) => {
    if (mode === 'on') dispatch(showPercent());
    else dispatch(hidePercent());
  };
  const isValidForm = () => {
    if (originalFund === '' || quantityCoin === '' || symbolCoin === '') {
      alert('Thiếu dữ liệu');
      return false;
    }
    if (+originalFund === 0 || +quantityCoin === 0) {
      alert('Số không hợp lệ');
      return false;
    }
    return true;
  };
  const getCoin = async (symbol) => {
    let coin = null;
    if (isValidForm()) {
      coin = Coins.find((coin) => coin.s === symbol.toUpperCase());
      if (coin) {
        coin['p'] = 'USDT';
        coin['q'] = +quantityCoin;
        coin['of'] = +originalFund;
        // fetch price
        let market =
          (symbolCoin === 'SMN' ? 'SAFEMOON' : symbolCoin) + symbolCoinPair;
        let price = await fetchPrice(market);
        coin['cf'] = price * +quantityCoin;
        coin['price'] = price;
      }
    }
    return coin;
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={3} md={3} lg={2} xl={3}>
          <CoinComboBox
            InputProps={{
              className: classes.input,
            }}
            value={symbolCoin}
            sendSymbol={sendSymbol}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={2} xl={3}>
          <PairComboBox
            InputProps={{
              className: classes.input,
            }}
            value={symbolCoinPair}
            sendSymbolPair={sendSymbolPair}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={3} lg={2} xl={3}>
          <CoinTextField
            size='small'
            id='txtQuantity'
            label='Số lượng'
            type='number'
            // InputLabelProps={{
            //   shrink: true,
            // }}
            variant='outlined'
            InputProps={{
              className: classes.input,
            }}
            value={quantityCoin}
            onChange={(e) => setQuantityCoin(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={3} lg={2} xl={3}>
          <CoinTextField
            size='small'
            id='txtFund'
            label='Vốn gốc'
            type='number'
            // InputLabelProps={{
            //   shrink: true,
            // }}
            variant='outlined'
            InputProps={{
              className: classes.input,
            }}
            value={originalFund}
            onChange={(e) => setOriginalFund(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sm={12} md={12} lg={2} xl={3}>
          <Button
            fullWidth
            style={{
              height: '39px',
              background: '#2c732c',
              color: 'rgb(222 222 222)',
              fontWeight: 'bold',
            }}
            variant='contained'
            startIcon={
              isAdding ? (
                <CircularProgress size={20} style={{ color: '#fff' }} />
              ) : (
                <AddIcon />
              )
            }
            disabled={isAdding}
            onClick={async () => {
              setIsAdding(true);
              let coin = await getCoin(symbolCoin);
              if (coin) {
                if (modeDCA === 'off') {
                  if (
                    currentState.entities.length >= 0 &&
                    currentState.entities.findIndex(
                      (entity) => entity.s === coin.s && entity.p === coin.p
                    ) === -1
                  ) {
                    dispatch(addCoin(coin));
                  } else {
                    alert(
                      `Đồng ${coin.s} đã có trong danh sách, xóa để thêm lại hoặc bật DCA`
                    );
                  }
                } else if (modeDCA === 'on') {
                  dispatch(addCoin(coin));
                }
              }
              setIsAdding(false);
            }}
          >
            Thêm
          </Button>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Button
            fullWidth
            style={{
              height: '39px',
              background: '#2c732c',
              color: 'rgb(222 222 222)',
              fontWeight: 'bold',
            }}
            //className={classes.btnCoin}
            variant='contained'
            endIcon={
              isUpdating ? (
                <CircularProgress size={20} style={{ color: '#fff' }} />
              ) : (
                <SyncIcon />
              )
            }
            onClick={async () => {
              setIsUpdating(true);
              setCountRefresh(process.env.REACT_APP_SYNC_PRICE_TIMEOUT / 1000);
              dispatch(backupMarkets());
              dispatch(
                updateCoins(await getCoinsWithNewPrices(currentState.entities))
              );
              setIsUpdating(false);
            }}
          >
            <CountDown countdown={countRefresh} />
          </Button>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Switcher label='DCA' mode='on' sendMode={sendModeDCA} />
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Switcher label='%' mode='on' sendMode={sendModePercent} />
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Switcher
            label='Giá'
            mode={currentState.isShowPrice ? 'on' : 'off'}
            sendMode={sendModePrice}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CoinList />
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
