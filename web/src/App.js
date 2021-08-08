import React, { useState, useEffect } from 'react';
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
import { addCoin, updateCoins } from './redux/slice';
import { Coins } from './data/coin.map';
import fetch from 'node-fetch';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    padding: '10px',
  },
  input: {
    color: 'white',
  },
  button: {
    backgroundColor: '#468446',
    color: '#821515',
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
    alert('API Service error');
    throw error;
  }
};
const fetchPrices = async (markets) => {
  let url = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(url + 'info/prices/' + markets.toString());
    const prices = await response.json();
    return prices;
  } catch (error) {
    log(error);
    alert(error);
  }
};
const getCoinsWithNewPrices = async (coins) => {
  let prices = await fetchPrices(coins.map((coin) => coin.s + coin.p));
  return coins.map((coin) => {
    let market = coin.s + coin.p;
    let currentFund = coin.cf;
    let price = prices[market];
    if (price) currentFund = coin.q * price;
    let c = { ...coin, cf: currentFund };
    return c;
  });
};
// function delay(second) {
//   return new Promise((res) => setTimeout(res, second * 1000));
// }
// const runUpdatePrices = async (dispatch, entities) => {
//   dispatch(updateCoins(await getCoinsWithNewPrices(entities)));
//   await delay(2);
//   await runUpdatePrices(dispatch, entities);
// };
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantityCoin, setQuantityCoin] = useState('');
  const [originalFund, setOriginalFund] = useState('');
  const [symbolCoin, setSymbolCoin] = useState('');
  const [symbolCoinPair, setSymbolCoinPair] = useState('USDT');
  let { currentState } = useSelector(
    (state) => ({ currentState: state.coin }),
    shallowEqual
  );
  useEffect(() => {
    //runUpdatePrices(dispatch, currentState.entities);
    //dispatch(updateCoins(await getCoinsWithNewPrices(currentState.entities)));
    // async function updatePrices() {
    //   await getCoinsWithNewPrices(currentState.entities);
    // }
    // updatePrices();
  }, []);
  const sendSymbol = (symbol) => {
    console.log(symbol);
    setSymbolCoin(symbol);
  };
  const sendSymbolPair = (symbol) => {
    console.log(symbol);
    setSymbolCoinPair(symbol);
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
      console.log(symbol);
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
            label='Số lượng coin'
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
            onClick={async () => {
              setIsAdding(true);
              dispatch(addCoin(await getCoin(symbolCoin)));
              setIsAdding(false);
            }}
          >
            Thêm
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CoinList />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
              isUpdating ? (
                <CircularProgress size={20} style={{ color: '#fff' }} />
              ) : (
                <SyncIcon />
              )
            }
            onClick={async () => {
              setIsUpdating(true);
              dispatch(
                updateCoins(await getCoinsWithNewPrices(currentState.entities))
              );
              //runUpdatePrices(dispatch, currentState.entities);
              log(currentState);
              setIsUpdating(false);
            }}
          >
            Cập nhật giá
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
