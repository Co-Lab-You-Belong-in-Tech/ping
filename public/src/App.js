//import logo from "./logo.svg";
import "./App.css";
import React, { useState, useMemo, useEffect } from "react";
//import { BrowserRouter } from "react-router-dom";
import UserContext from "./UserContext"; //"create UserContext to store userID throughout the app "
import Routes from "./components/Routes";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  const [user, setUser] = useState(null); // set the user as 1 sitewide

  const [expiredItem, setExpiredItems] = useState([]);
  const value = useMemo(
    () => ({ user, setUser, expiredItem, setExpiredItems }),
    [user, setUser, expiredItem, setExpiredItems]
  ); // passing the value

  //local storage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <ReactNotification />

        <Routes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
