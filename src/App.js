import {Routing} from './routes/Routing'
import {NavigationBar} from './components/navigationbar/NavigationBar'
import {Footer} from './components/footer/Footer'
import {AuthProvider} from './shared/global/provider/UserProvider'
import {ThemeProvider} from '@material-ui/core'
import themeUi from './themeUi'
import './App.css';
import './shared/global/Global.css';

function App() {
  return (
    <ThemeProvider theme={themeUi}>
      <AuthProvider>
        <Routing>
          <NavigationBar />
        </Routing>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
