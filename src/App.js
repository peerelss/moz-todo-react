import logo from './logo.svg';
import './App.css';
import JTest from './comps/JTest';
import MinerHashRate from './comps/MinerHashRate';
import MinerZero from './comps/MinerZero';
import MinerOffline from './comps/MinerOffline';
import CookiesManager from './comps/CookiesManager';

function App() {
  return (
    <div className="App">
      <MinerHashRate />
      <MinerZero />
      <MinerOffline />
      <CookiesManager/>
    </div>
  );
}

export default App;
