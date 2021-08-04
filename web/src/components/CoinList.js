import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
//import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { entities, removeCoin } from '../redux/slice';
import { useSelector, useDispatch } from 'react-redux';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    //backgroundColor: theme.palette.background.paper,
    backgroundColor: '#b1b19a',
  },
}));

// const fetchPrice = (symbol) => {
//   return 35345
// }
// const addCoin = (data, {s, q, of}) => {
//     let coins = {s, q, of}
//     data['price'] = fetchPrice('BTC')
//     data.push(coins)
// }

export default function CoinList() {
  const data = useSelector(entities);
  const dispatch = useDispatch();
  const classes = useStyles(),
    srcCoinIconPrefix = 'https://s2.coinmarketcap.com/static/img/coins/64x64/',
    extensionCoinIcon = '.png',
    widthCoinIcon = '32px',
    heightCoinIcon = '32px';
  let coinItems = [];
  let trendingIcon = (profix) =>
    profix > 0 ? (
      <TrendingUpIcon fontSize='small' style={{ verticalAlign: 'bottom' }} />
    ) : (
      <TrendingDownIcon fontSize='small' style={{ verticalAlign: 'bottom' }} />
    );
  const CoinListItemText = withStyles({
    root: {
      textAlign: 'left',
      backgroundColor: 'transparent',
    },
  })(ListItemText);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  const formatOriginalFund = (fund) => {
    if (fund % 1 === 0)
      return (
        formatter.format(fund.toFixed(2)).replace('$', '').replace('.00', '') +
        ' $'
      );
    return formatter.format(fund).replace('$', '').replace('.00', '') + ' $';
  };
  const formatCurentFund = (fund) => {
    if (fund % 1 === 0)
      fund =
        formatter.format(fund.toFixed(2)).replace('$', '').replace('.00', '') +
        ' $';
    else
      fund = formatter.format(fund).replace('$', '').replace('.00', '') + ' $';
    return (
      <>
        {fund}
        <DeleteIcon
          style={{ float: 'right', color: '#ab2828', cursor: 'pointer' }}
          onClick={() => dispatch(removeCoin({ symbol: 'BTC', pair: 'USDT' }))}
        />
      </>
    );
  };
  const formatQuantityCoin = (quantity) => {
    if (quantity >= 1000000) quantity = (quantity / 1000000).toFixed(2) + 'M';
    else if (quantity >= 100000) quantity = (quantity / 1000).toFixed(2) + 'K';
    else if (quantity < 1) quantity = quantity.toFixed(5);
    else
      quantity = formatter.format(quantity).replace('$', '').replace('.00', '');
    return quantity;
  };
  const formatSymbolCoin = (symbol) => {
    if(symbol.length > 5) symbol = symbol.substring(0,5) + '...'
    return symbol;
  };
  const formatProfix = (profix, profixPercent) => {
    return (
      <Typography
        style={{
          color: profix < 0 ? '#cc1a1a' : 'rgb(1 154 1)',
          fontSize: '0.875rem',
        }}
      >
        {trendingIcon(profix)}
        {' ' + formatOriginalFund(Math.abs(profix))} (
        <i>{(Math.abs(profixPercent) * 100).toFixed(1)}%</i>)
      </Typography>
    );
  };
  if (data.length > 0) {
    coinItems = data.map((record, index) => {
      let profix = record.cf - record.of,
        profixPercent = profix / record.of;
      return (
        <ListItem key={index}>
          <ListItemAvatar style={{ width: '32px' }}>
            <Avatar>
              <IconButton color='primary'>
                <img
                  alt=''
                  width={widthCoinIcon}
                  height={heightCoinIcon}
                  src={srcCoinIconPrefix + record.i + extensionCoinIcon}
                />{' '}
              </IconButton>
            </Avatar>
          </ListItemAvatar>
          <CoinListItemText
            style={{ width: '25%' }}
            primary={formatSymbolCoin(record.s)}
            secondary={record.n}
          />
          {/* Quantity Coin & Original Fund */}
          <CoinListItemText
            style={{ width: '30%' }}
            //alignItems='flex-start'
            primary={formatQuantityCoin(record.q)}
            secondary={formatOriginalFund(record.of)}
          />
          {/* Percent Profix & Current Fund */}
          <CoinListItemText
            style={{ width: '50%' }}
            primary={formatProfix(profix, profixPercent)}
            secondary={formatCurentFund(record.cf)}
          />
          {/* <DeleteIcon color="secondary" /> */}
          {/* <ListItemSecondaryAction>
            <IconButton
              edge='end'
              aria-label='delete'
              style={{ color: '#CF304A' }}
              onClick={() =>
                dispatch(removeCoin({ symbol: 'BTC', pair: 'USDT' }))
              }
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction> */}
        </ListItem>
      );
    });
  }
  return <List className={classes.root}>{coinItems}</List>;
}
