import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import FridgeArea from "../components/FridgeArea";
import { get } from "http";

function Inventory() {
  const { user, setExpiredItems, expiredItem } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const data = await OwnAPI.getTheUserInventory(user);
        console.log(getExpiredArray(data));
        setExpiredItems(getExpiredArray(data)); /// need to rethink where put this function?
        setUserData(data);
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, []);

  function getExpiredArray(data) {
    let result = [];
    if (!data) return;
    data = data.filter((a) => a.inventory_tag === "expired");
    for (var i in data) {
      result.push(data[i].inventory_item_name);
    }
    return result;
  }

  if (!userData) return <div>Loading!</div>;
  // loop through the data and find the expiration item and put them into array and set the expiration item appwide

  // logic:  if the itemtag is not expired , display here; if user click toss or used buttom they disapper from the page but change the tag in database
  return (
    <div>
      <h1>This is {user} fridge</h1>

      <FridgeArea userData={userData} />
    </div>
  );
}

export default Inventory;
