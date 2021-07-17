import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { entities, removeCoin } from '../redux/slice';
import { useSelector, useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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
  if (data.length > 0) {
    coinItems = data.map((record, index) => {
      let profix = record.of - record.cf,
        profixPercent = profix / record.of;
      return (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar>
              <IconButton color='primary'>
                <img
                  alt=''
                  width={widthCoinIcon}
                  height={heightCoinIcon}
                  src={srcCoinIconPrefix + record.i + extensionCoinIcon}
                />{' '}
                {/*Mock image, attribute in option*/}
              </IconButton>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={record.s} secondary={record.n} />
          <ListItemText primary={record.q} secondary={record.cf + ' $'} />
          <ListItemText
            primary={record.of.toFixed(2) + ' $'}
            secondary={
              <Typography
                style={{
                  color: profix < 0 ? 'red' : '#02C076',
                  fontSize: '0.875rem',
                }}
              >
                {profix.toFixed(2)} $ (
                <i>{(profixPercent * 100).toFixed(2)}%</i>)
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              edge='end'
              aria-label='delete'
              style={{ color: '#CF304A' }}
              onClick={() => dispatch(removeCoin({symbol:'BTC', pair:'USDT'}))}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }
  return <List className={classes.root}>{coinItems}</List>;
}
