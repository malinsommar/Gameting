import { createMuiTheme } from '@material-ui/core/styles';

const themeUi = createMuiTheme({

  palette: {
    primary: {
      main: '#8677db',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#ffffff',
    },
  },
});

export default themeUi;
