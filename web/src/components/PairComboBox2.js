import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    '& $notchedOutline': {
      borderColor: 'red',
    },
    '&:hover $notchedOutline': {
      borderColor: 'blue',
    },
    '&$focused $notchedOutline': {
      borderColor: 'green',
    },
  },
  focused: {},
  notchedOutline: {},
}));

export default function PairComboBox2() {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [pair, setPair] = React.useState('');
  const [labelWidth, setLabelWidth] = React.useState(0);
  const handleChange = (event) => {
    setPair(event.target.value);
  };

  return (
    <FormControl variant='outlined' className={classes.formControl}>
      <InputLabel id='demo-simple-select-outlined-label'>Loại tiền</InputLabel>
      <Select
        //classes={{ root: classes.selectRoot }}
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        value={pair}
        onChange={handleChange}
        label='Loại tiền'
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            name='age'
            id='outlined-age-simple'
            classes={outlinedInputClasses}
          />
        }
      >
        <MenuItem value={'USDT'}>USDT</MenuItem>
        <MenuItem value={'BTC'}>BTC</MenuItem>
        <MenuItem value={'BNB'}>BNB</MenuItem>
      </Select>
    </FormControl>
  );
}
