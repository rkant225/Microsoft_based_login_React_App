import logo from './logo.svg';
import './App.css';
import { MsalProvider } from "@azure/msal-react";
import IndicatorComponent from './IndicatorComponent';
import instance from './MSALInstance';

const App = ()=> {

  
    return (
      <MsalProvider instance={instance}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <IndicatorComponent/>
          </header>
        </div>
      </MsalProvider>
    );
  }

export default App;
