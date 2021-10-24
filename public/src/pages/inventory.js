import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import FridgeArea from "../components/FridgeArea";
import logo from "../assets/Fridge_Logo.png";
import BottomNavBar from "../components/nav/BottomNavBar";

function Inventory() {
  const { user, setExpiredItems, expiredItem } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const data = await OwnAPI.getTheUserInventory(user);
        console.log(data);
        //console.log(getExpiredArray(data));
        setExpiredItems(getExpiredArray(data)); /// need to rethink where put this function?
        setUserData(data);
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, []);

  // the expire item logic need some refactor.
  function getExpiredArray(data) {
    let result = [];
    if (!data) return ["carrot"];
    data = data.filter((a) => a.inventory_tag === "expired");
    for (var i in data) {
      result.push(data[i].inventory_item_name.replace(/ .*/, "").toLowerCase());
    }
    return result;
  }

  // loop through the data and find the expiration item and put them into array and set the expiration item appwide

  // logic:  if the itemtag is not expired , display here; if user click toss or used buttom they disapper from the page but change the tag in database
  return (
    <div>
      <img src={logo} />
      <h1>{user}My Fridge</h1>

      <FridgeArea userData={userData} />
      <BottomNavBar name="inventory" />
    </div>
  );
}

export default Inventory;
