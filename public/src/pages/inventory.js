import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function Inventory() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      This is {user} fridge
      <NavBar />
    </div>
  );
}

export default Inventory;
