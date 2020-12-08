import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({onChange}) {
    const classes = useStyles();
    const [sex, setSex] = React.useState('');
  
    const handleChange = (event) => {
      setSex(event.target.value);
    };
  
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Sex</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sex}
            onChange={handleChange}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>
        </div>
    )}




/*const SelectField = ({items, text, onChange, value}) => {

    const classes = useStyles();

    const mapOutItems = () => {
        return items.map((item, index) => {
           return <MenuItem key={index} value={value}>{item}</MenuItem>
        })
    }

    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">{text}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={onChange}
            >
                {<MenuItem ref={value} value="Hej">Hej</MenuItem>}
                {<MenuItem ref={value} value="Hejdå">Hejdå</MenuItem>}
          </Select>
        </FormControl>
      </div>
    );
  }

  export default SelectField;
  */