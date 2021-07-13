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
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CoinList() {
  const classes = useStyles(),
    srcCoinIconPrefix = 'https://s2.coinmarketcap.com/static/img/coins/64x64/',
    extensionCoinIcon = '.png',
    widthCoinIcon = '32px',
    heightCoinIcon = '32px',
    data = [
      { i: 1, s: 'BTC', n: 'Bitcoin', of: 201.3245, q: 0.1234, cf: 100 },
      { i: 1027, s: 'ETH', n: 'Etherum', of: 501.1234, q: 0.4321, cf: 700 },
    ],
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
              <Typography style={{ color: profix < 0 ? 'red' : 'green', fontSize:'13px' }}>
                {profix.toFixed(2)}$ <i>({(profixPercent*100).toFixed(2)}%)</i>
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <IconButton edge='end' aria-label='delete' style={{ color: '#CF304A' }}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });

  return <List className={classes.root}>{coinItems}</List>;
}
