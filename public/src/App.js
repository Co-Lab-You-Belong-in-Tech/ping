//import logo from "./logo.svg";
import "./App.css";
import React, { useState, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./UserContext"; //"create UserContext to store userID throughout the app "
import NavBar from "./components/NavBar";
import Routes from "./components/Routes";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import OwnAPI from "./Api";

function App() {
  const [user, setUser] = useState(1); // set the user as 1 sitewide

  const [expiredItem, setExpiredItems] = useState(["apple", "carrot"]);
  const value = useMemo(
    () => ({ user, setUser, expiredItem, setExpiredItems }),
    [user, setUser, expiredItem, setExpiredItems]
  ); // passing the value

  /*function editInventory(tag, item_id) {
    if (!user || !item_id || tag) return;
    OwnAPI.editFridge(tag, user, item_id);
    // better set expired item here but i am not sure
  }*/

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <ReactNotification />
        <BrowserRouter>
          <Routes />
          <NavBar />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
