/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Coins} from './coin.map.js'
export default function ComboBox() {
  return (
    <Autocomplete
      id='combo-box-demo'
      options={Coins}
      getOptionLabel={(option) => option.s}
      style={{marginBottom: '10px' }}
      renderInput={(params) => (
        <TextField {...params} label='Input coin name' variant='outlined' />
      )}
    />
  );
}
