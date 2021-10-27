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
import { removeCoin } from '../redux/slice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import coinSummaryLogo from '../img/fav.png';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    //backgroundColor: theme.palette.background.paper,
    backgroundColor: '#b1b19a',
  },
}));

export default function CoinList() {
  //const data = useSelector(entities);
  const dispatch = useDispatch();
  const classes = useStyles(),
    srcCoinIconPrefix = 'https://s2.coinmarketcap.com/static/img/coins/64x64/',
    extensionCoinIcon = '.png',
    widthCoinIcon = '32px',
    heightCoinIcon = '32px';
  let { currentState } = useSelector(
    (state) => ({
      currentState: state.coin,
    }),
    shallowEqual
  );

  /**
   * Format function group
   */
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const formatOriginalFund = (fund) => {
    if (fund % 1 === 0)
      return (
        formatter.format(fund.toFixed(2)).replace('$', '').replace('.00', '')
      );
    return formatter.format(fund).replace('$', '').replace('.00', '');
  };
  const formatFund = (fund) => {
    if (fund % 1 === 0)
      return (
        formatter.format(fund.toFixed(2)).replace('$', '').replace('.00', '')
      );
    return formatter.format(fund).replace('$', '').replace('.00', '');
  };

  const formatCurentFund = (record) => {
    let fund = record.cf;
    if (fund % 1 === 0)
      fund =
        formatter.format(fund.toFixed(2)).replace('$', '').replace('.00', '');
    else
      fund = formatter.format(fund).replace('$', '').replace('.00', '');
    return (
      <>
        ${fund}
        <DeleteIcon
          style={{ float: 'right', color: '#ab2828', cursor: 'pointer' }}
          onClick={() => dispatch(removeCoin({ index: record.index }))}
        />
      </>
    );
  };

  const formatQuantityCoin = (quantity) => {
    if (quantity >= 1000000000) quantity = formatFund((quantity / 1000000000)) + 'B';
    else if (quantity >= 1000000) quantity = (quantity / 1000000).toFixed(2) + 'M';
    else if (quantity >= 100000) quantity = (quantity / 1000).toFixed(2) + 'K';
    else if (quantity < 1) quantity = quantity.toFixed(5);
    else
      quantity = formatter.format(quantity).replace('$', '').replace('.00', '');
    return quantity;
  };

  const formatSymbolCoin = (symbol) => {
    if (symbol) {
      //console.log(symbol);
      if (symbol.length > 5) symbol = symbol.substring(0, 5) + '...';
      return symbol;
    }
  };
  const formatNameCoin = (name) => {
    switch (name) {
      case 'Binance Coin':
        name = 'Binance';
        break;
      case 'Internet Computer':
        name = 'Internet...';
        break;
      default:
        break;
    }
    return name;
  };

  const formatProfix = (profix, profixPercent, isSummary = false) => {
    return (
      <Typography
        style={{
          color: profix < 0 ? '#cc1a1a' : 'rgb(1 154 1)',
          fontSize: isSummary ? '0.875rem' : '1rem',
        }}
      >
        {trendingIcon(profix)}
        {' $' + formatOriginalFund(Math.abs(profix)) + ' '}
        {formatProfixPercent(profixPercent)}
      </Typography>
    );
  };
  const formatPrice = (record) => {
    let price = +record.price;
    let market = record.s + record.p;
    let prevPrice = isNaN(currentState.prevMarkets[market])
      ? price
      : +currentState.prevMarkets[market];
    // console.log('prevPrice %s: %s', market, prevPrice);
    // console.log('price %s : %s', market, price);
    // console.log(currentState.prevMarkets);

    return (
      <Typography
        style={{
          color: price >= prevPrice ? '#019A01' : '#cc1a1a',
          fontSize: '0.875rem',
        }}
      >
        {/* {trendingIconPrice(price, prevPrice)}{' '} */}
        ${price < 1000
          ? //? +price.toString().substring(0, 11)
            //+toPlainString(price).substring(0, 14)
            (+toPlainString(price).substring(0, 14)).toString().substring(0, 9)
          : formatOriginalFund(price).replace('$', '')}{' '}
      </Typography>
    );
  };
  function toPlainString(num) {
    return ('' + +num).replace(
      /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
      function (a, b, c, d, e) {
        return e < 0
          ? b + '0.' + Array(1 - e - c.length).join(0) + c + d
          : b + c + d + Array(e - d.length + 1).join(0);
      }
    );
  }
  const formatPurchasePrice = (record) => {
    let purchasePrice = record.of / record.q;
    return (
      <>
        {(+toPlainString(purchasePrice).substring(0, 12))
          .toString()
          .substring(0, 9)}
        <DeleteIcon
          style={{ float: 'right', color: '#ab2828', cursor: 'pointer' }}
          onClick={() => dispatch(removeCoin({ index: record.index }))}
        />
      </>
    );
  };

  const formatProfixPercent = (profixPercent) => {
    return currentState.isShowPercent ? (
      <>
        (
        <i style={{ fontSize: '11px', fontWeight: 'bold' }}>
          {(Math.abs(profixPercent) * 100).toFixed(1) + '%'}
        </i>
        )
      </>
    ) : (
      ''
    );
  };

  /**
   * Components Util group
   */

  let trendingIcon = (profix) =>
    profix > 0 ? (
      <TrendingUpIcon fontSize='small' style={{ verticalAlign: 'bottom' }} />
    ) : (
      <TrendingDownIcon fontSize='small' style={{ verticalAlign: 'bottom' }} />
    );
  let trendingIconPrice = (price, prevPrice) =>
    price >= prevPrice ? (
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

  let totalCurrentFund = 0,
    totalOriginalFund = 0,
    totalProfix = 0,
    totalProfixPercent = 0;
  currentState.entities.forEach((entity) => {
    totalCurrentFund += +entity.cf;
    totalOriginalFund += +entity.of;
  });

  totalProfix = totalCurrentFund - totalOriginalFund;
  totalProfixPercent = totalProfix / totalOriginalFund;
  let coinSummary = '';
  if (currentState.entities.length > 0) {
    coinSummary = (
      <ListItem
        style={{
          marginBottom: '5px',
          backgroundColor: 'rgb(193 193 174)',
          borderBottom: '2px dotted rgb(25 27 32)',
        }}
      >
        <ListItemAvatar style={{ width: '32px' }}>
          <Avatar>
            <IconButton color='primary'>
              <img
                alt=''
                width={widthCoinIcon}
                height={heightCoinIcon}
                src={coinSummaryLogo}
              />{' '}
            </IconButton>
          </Avatar>
        </ListItemAvatar>
        <CoinListItemText
          style={{ width: '25%' }}
          primary={'Vốn:'}
          secondary={'Ví:'}
        />
        {/* Total Original Fund & Total Current Fund */}
        <CoinListItemText
          style={{ width: '30%' }}
          primary={'$' + formatFund(totalOriginalFund)}
          secondary={'$' + formatFund(totalCurrentFund)}
        />
        {/* Total Profix & Total Profix Percent} */}
        <CoinListItemText
          style={{ width: '50%' }}
          primary={'Lãi cuối:'}
          secondary={formatProfix(totalProfix, totalProfixPercent, true)}
        />
      </ListItem>
    );
  }

  let coinItems = [];
  if (currentState.entities.length > 0) {
    coinItems = currentState.entities.map((record, index) => {
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
            style={{ width: '27%' }}
            primary={formatSymbolCoin(record.s)}
            secondary={
              currentState.isShowPrice
                ? formatPrice(record)
                : formatNameCoin(record.n)
            }
          />
          {/* Quantity Coin & Original Fund */}
          <CoinListItemText
            style={{ width: '30%' }}
            //alignItems='flex-start'
            primary={formatQuantityCoin(record.q)}
            secondary={'$' +formatOriginalFund(record.of)}
          />
          {/* Percent Profix & Current Fund */}
          <CoinListItemText
            style={{ width: '50%' }}
            primary={formatProfix(profix, profixPercent)}
            secondary={
              currentState.isShowPrice
                ? formatPurchasePrice(record)
                :formatCurentFund(record)
            }
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
  return (
    <>
      <List className={classes.root}>
        {coinSummary}
        {coinItems}
      </List>
    </>
  );
}
