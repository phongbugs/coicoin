import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const PurpleSwitch = withStyles({
  switchBase: {
    color: yellow[250],
    '&$checked': {
      color: yellow[300],
    },
    '&$checked + $track': {
      backgroundColor: yellow[500],
    },
  },
  checked: {},
  track: {},
})(Switch);
export default function CustomizedSwitches(props) {
  //https://stackoverflow.com/questions/40722382/how-to-pass-state-back-to-parent-in-react
  /**
   * Simple Steps:
      - Create a component called Parent.
      - In Parent Component create a method that accepts some data and sets the accepted data as the parent's state.
      - Create a component called Child.
      - Pass the method created in Parent to child as props.
      - Accept the props in parent using this.props followed by method name and pass child's state to it as argument.
      - The method will replace the parent's state with the child's state.
   */
  const [state, setState] = React.useState({
    checkedA: props.mode === 'on' ? true : false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <PurpleSwitch
            checked={state.checkedA}
            onChange={handleChange}
            name='checkedA'
          />
        }
        color='primary'
        label={props.label}
        style={{ color: '#fff' }}
      />
    </FormGroup>
  );
}
