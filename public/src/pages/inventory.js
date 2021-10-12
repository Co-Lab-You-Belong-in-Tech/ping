import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
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
  // loop through the data and find the expiration item and put them into array and set the expiration item appwide

  // logic:  if the itemtag is not expired , display here; if user click toss or used buttom they disapper from the page but change the tag in database
  return (
    <div>
      <h1>This is {user} fridge</h1>

      <div></div>
    </div>
  );
}

export default Inventory;
