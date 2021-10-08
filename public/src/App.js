//import logo from "./logo.svg";
import "./App.css";
import React, { useState, useMemo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import Tips from "./pages/tips";
import Inventory from "./pages/inventory";
import SearchPage from "./pages/search";
import UserContext from "./UserContext"; //"create UserContext to store userID throughout the app "
import ErrorPage from "./pages/errorPage";
import List from "./pages/list";
import RecipesPage from "./pages/recipes";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(1);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <UserContext.Provider value={value}>
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
            <Route path="/list" exact>
              <List />
            </Route>
            <Route path="/recipes" exact>
              <RecipesPage />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
