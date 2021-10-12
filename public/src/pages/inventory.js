import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import NavBar from "../components/NavBar";
import OwnAPI from "../Api";

function Inventory() {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const data = await OwnAPI.getTheUserInventory(user);
        console.log(data);
        setUserData(data);
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <h1>This is {user} fridge</h1>
      <div></div>
    </div>
  );
}

export default Inventory;
