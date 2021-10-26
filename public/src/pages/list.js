import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GroceryItems from "../components/GroceryItem";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import groceryLogo from "../assets/Grocery_Logo.png";
import BottomNavBar from "../components/nav/BottomNavBar";
import "../App.css";

const List = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  async function getData() {
    try {
      const data = await OwnAPI.getGroceries(user);
      const a = data.filter((a) => a.display_tag !== "deleted"); // filter the userdata to display no deleted one
      //console.log(a);
      let sortedA = a.sort((b, a) => a.grocery_item_id - b.grocery_item_id); // sort the data by the grocery_item_id
      setUserData(sortedA);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getData();
  }, [user]);

  function deleteAll(userData) {
    let array = [];
    for (var i = 0; i < userData.length; i++) {
      array.push(userData[i].grocery_item_id);
    }
    console.log(array);
    OwnAPI.editGroceryDeleteTag("deleted", user, array); //call api to delete all
    setUserData(null);
  }
  return (
    <div>
      <div className="header-box">
        <div className="header-logo">
          <img
            src={groceryLogo}
            alt="grocery_logo"
            style={{ width: "84.36px", height: "84.36px" }}
          />
        </div>
        <div className="header-title">
          <h1>My Grocery List</h1>
        </div>
      </div>
      <div style={{ paddingTop: "2%" }}>
        <Link to="/search">
          <button className="btn-large">ADD ITEM</button>
        </Link>
        <button className="btn-lg-danger" onClick={() => deleteAll(userData)}>
          DELETE ALL
        </button>
      </div>
      <div style={{ top: "0" }}>
        <GroceryItems
          userData={userData}
          getData={getData}
          setUserData={setUserData}
        />
      </div>
      <BottomNavBar name="list" />
    </div>
  );
};

export default List;
