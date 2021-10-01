import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import Tips from "./pages/tips";
import Inventory from "./pages/inventory";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/tips/:name">
            <Tips />
          </Route>
          <Route path="/inventory" exact>
            <Inventory />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
