import logo from "./logo.svg";
import "./App.css";
import { Outlet, Link } from "react-router-dom";
import MainRouter from "./comps/MainRouter";
import MainView from "./comps/MainView";
function App() {
  return (
    <div className="App">
      <MainView />
    </div>
  );
}

export default App;
