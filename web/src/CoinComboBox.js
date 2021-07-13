/* eslint-disable no-use-before-define */
import React, { Fragment } from 'react';
import CoinTextField from './CoinTextField.js';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Coins } from './coin.map.js';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles((theme) => ({
//   input: {
//     color: 'white',
//   },
// }));
export default function CoinComboBox(props) {
  const srcCoinIconPrefix =
      'https://s2.coinmarketcap.com/static/img/coins/64x64/',
    extensionCoinIcon = '.png',
    widthCoinIcon = '32px',
    heightCoinIcon = '32px',
    filterOptions = createFilterOptions({
      matchFrom: 'start',
      stringify: (option) => option.s,
      limit: 20,
    })
  return (
    <Autocomplete
      size='small'
      id='combo-box-demo'
      options={Coins}
      getOptionLabel={(option) => option.s}
      style={{ marginBottom: '10px', color:'white' }}
      renderInput={(params) => (
        <CoinTextField
          {...params}
          label='Tên coin'
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
          // InputProps={{
          //   className: 'inputColor',
          // }}
          placeholder='Nhập mã coin'
        />
      )}
      filterOptions={filterOptions}
      renderTags={(options) => {
        return options.map((option) => (
          <Fragment>
            <IconButton color='primary'>
              <img
                alt=''
                width={widthCoinIcon}
                height={heightCoinIcon}
                src={srcCoinIconPrefix + option.i + extensionCoinIcon}
              />{' '}
              {/*Mock image, attribute in option*/}
            </IconButton>
            {option.n}
          </Fragment>
        ));
      }}
      renderOption={(option) => {
        return (
          <Fragment>
            <IconButton color='primary'>
              <img
                alt=''
                width={widthCoinIcon}
                height={heightCoinIcon}
                src={srcCoinIconPrefix + option.i + extensionCoinIcon}
              />{' '}
              {/*Mock image, attribute in option*/}
            </IconButton>
            {option.n + ' (' + option.s + ')'}
          </Fragment>
        );
      }}
      // renderInput={(params) => (
      //   <TextField
      //     {...params}
      //     variant='outlined'
      //     label='limitTags'
      //     placeholder='Favorites'
      //   />
      // )}
    />
  );
}
