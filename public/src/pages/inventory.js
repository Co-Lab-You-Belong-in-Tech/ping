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

  if (!userData) return <div>Loading!</div>;

  return (
    <div>
      <h1>This is {user} fridge</h1>
      <div></div>

      <NavBar />
    </div>
  );
}

export default Inventory;
