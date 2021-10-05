//import logo from "./logo.svg";
import "./App.css";
import React, { useState, useMemo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import Tips from "./pages/tips";
import Inventory from "./pages/inventory";
import SearchPage from "./pages/search";
import UserContext from "./UserContext"; //"create UserContext to store userID throughout the app "

function App() {
  const [user, setUser] = useState(1);

  //const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser() }}>
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
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
