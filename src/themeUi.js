import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, amber } from '@material-ui/core/colors';

const themeUi = createMuiTheme({

  palette: {
    primary: {
      main: '#8677db',
      contrastText: '#ffffff'
    },
    secondary: {
      main: amber[500],
      contrastText: deepPurple[900],
    },
  },
});

export default themeUi;
