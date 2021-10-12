//import logo from "./logo.svg";
import "./App.css";
import React, { useState, useMemo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserContext from "./UserContext"; //"create UserContext to store userID throughout the app "
import NavBar from "./components/NavBar";
import Routes from "./components/Routes";

function App() {
  const [user, setUser] = useState(1);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
