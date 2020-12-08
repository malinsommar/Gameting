import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const BasicTextFields = ({type, rows, text, onChange, multiline}) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id={type} multiline={multiline} label={text} onChange={onChange} rows={rows} />
    </form>
  );
}

export default BasicTextFields;

/*
Singleline:
<TextField type="standard-basic" text="Mail" onChange={event => setMail(event.target.value)}/>
Multiline:
<TextField type="standard-multiline-flexible" multiline="multiline" rows="2" text="Mail" onChange={event => setMail(event.target.value)}/>
*/