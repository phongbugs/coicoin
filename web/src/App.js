import React from 'react';
import './App.css';
import CoinComboBox from './CoinComboBox';
import CoinTextField from './CoinTextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CoinList from './CoinList';
import { makeStyles } from '@material-ui/core/styles';
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
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <CoinComboBox InputProps={{
              className: classes.input,
            }}/>
        </Grid>
        <Grid item xs={4} sm={3} md={3} lg={3} xl={3}>
          <CoinTextField
            size='small'
            id='txtQuantity'
            label='Số lượng'
            type='number'
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
            InputProps={{
              className: classes.input,
            }}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={3} lg={3} xl={3}>
          <CoinTextField
            size='small'
            id='txtFund'
            label='Vốn'
            type='number'
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
            InputProps={{
              className: classes.input,
            }}
          />
        </Grid>
        <Grid item xs={2} sm={3} md={3} lg={3} xl={3}>
          <Button
            variant='contained'
            className={classes.button}
            startIcon={<AddIcon />}
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
