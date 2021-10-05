//import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import Tips from "./pages/tips";
import Inventory from "./pages/inventory";
import SearchPage from "./pages/search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/tips/:name/:id">
            <Tips />
          </Route>
          <Route path="/inventory" exact>
            <Inventory />
          </Route>
          <Route path="/search" exact>
            <SearchPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
