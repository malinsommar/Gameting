import {Routing} from './routes/Routing'
import {NavigationBar} from './components/navigationbar/NavigationBar'
import {UserProvider} from './shared/global/provider/UserProvider'
import {ThemeProvider} from '@material-ui/core'
import themeUi from './themeUi'
import './App.css';
import './shared/global/Global.css';

function App() {
  return (
    <ThemeProvider theme={themeUi}>
      <UserProvider>
        <Routing>
          <NavigationBar />
        </Routing>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
