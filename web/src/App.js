import React, { useState } from 'react';
import './App.css';
import CoinComboBox from './components/CoinComboBox';
import CoinTextField from './components/CoinTextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CoinList from './components/CoinList';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { addCoin } from './redux/slice';
import { Coins } from './data/coin.map';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    padding: '10px',
  },
  input: {
    color: 'white',
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [quantityCoin, setQuantityCoin] = useState('');
  const [originalFund, setOriginalFund] = useState('');
  const [symbolCoin, setSymbolCoin] = useState('');

  const isValidForm = () => {
    if (originalFund === '' || !quantityCoin === '' || !symbolCoin === '') {
      alert('Thiếu dữ liệu');
      return false;
    }
    return true;
  };
  const getCoin = (symbol) => {
    let coin = null;
    if (isValidForm()) {
      console.log(symbol);
      coin = Coins.find((coin) => coin.s === symbol.toUpperCase());
      if (coin) {
        coin['p'] = 'USDT';
        coin['q'] = quantityCoin;
        coin['of'] = originalFund;
      }
    }
    return coin;
  };
  const sendSymbol = (symbol) => {
    console.log(symbol);
    setSymbolCoin(symbol);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <CoinComboBox
            InputProps={{
              className: classes.input,
            }}
            value={symbolCoin}
            sendSymbol={sendSymbol}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={3} lg={3} xl={3}>
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
        <Grid item xs={4} sm={3} md={3} lg={3} xl={3}>
          <CoinTextField
            size='small'
            id='txtFund'
            label='Vốn'
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
        <Grid item xs={2} sm={3} md={3} lg={3} xl={3}>
          <Button
            variant='contained'
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={() => dispatch(addCoin(getCoin(symbolCoin)))}
          >
            Add
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CoinList />
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
