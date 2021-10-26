import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import FridgeArea from "../components/FridgeArea";
import logo from "../assets/Fridge_Logo.png";
import BottomNavBar from "../components/nav/BottomNavBar";
import Helper from "../hooks/Helpers";

function Inventory() {
  const { user, setExpiredItems } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const data = await OwnAPI.getTheUserInventory(user);
        const a = data.filter((a) => a.usage_tag === null);
        //console.log(a);
        //console.log(getExpiredArray(data));
        setExpiredItems(Helper.getExpiredArray(data)); /// need to rethink where put this function?

        // need to sort the data by the expiration date
        let sortedA = a.sort(
          (a, b) =>
            Date.parse(new Date(a.expiry_date.split("/").reverse().join("-"))) -
            Date.parse(new Date(b.expiry_date.split("/").reverse().join("-")))
        );

        setUserData(sortedA);
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
      <div className="header-box">
        <div className="header-logo">
          <img
            src={logo}
            alt="grocery_logo"
            style={{ width: "84.36px", height: "84.36px" }}
          />
        </div>
        <div className="header-title" style={{ paddingLeft: "15%" }}>
          <h1>My Fridge</h1>
        </div>
      </div>

      <FridgeArea userData={userData} />
      <BottomNavBar name="inventory" />
    </div>
  );
}

export default Inventory;
