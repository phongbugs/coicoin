import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
const CoinTextField = withStyles({
  root: {
    '& label': {
      color: '#F5CE34',
    },
    '& label.Mui-focused': {
      color: 'yellow',
    },
    '& .MuiInput-underline:after': {
      //borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        //borderColor: '#F5CE34',
        border: '1px dotted #F5CE34',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F5CE34',
      },
      '&.MuiInputBase-input': {
        color: '#fff',
      },
      
    },
  }
})(TextField);

export default CoinTextField;
