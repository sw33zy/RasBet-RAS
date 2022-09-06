
import './App.css';
import Eventos from './Eventos';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrimarySearchAppBar from "./Components/NavBar";
import { createTheme, ThemeProvider} from '@material-ui/core'
import {grey} from "@material-ui/core/colors";
import Historico from "./Historico";
import Home from "./Home";
import {Provider} from 'react-redux';
import {store} from './ReduxStore';
import Admin from "./Admin";

const theme = createTheme({
    palette: {
        primary: {
            main: grey[900]
        },
        secondary: {
            main: '#DDA74F'
        }
    },
});

const App = () => {
  return (
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <Router>
                <div style={{backgroundColor:"#F4F6F8"}}>
                    <PrimarySearchAppBar/>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                    </Routes>
                    <Routes>
                        <Route path='/eventos' element={<Eventos/>} />
                    </Routes>
                    <Routes>
                        <Route path='/historico' element={<Historico/>} />
                    </Routes>
                    <Routes>
                        <Route path='/admin' element={<Admin/>} />
                    </Routes>
                </div>
              </Router>
          </ThemeProvider>
      </Provider>
  );
}

export default App;
