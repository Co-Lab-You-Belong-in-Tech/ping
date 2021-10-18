import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GroceryItems from "../components/GroceryItem";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import groceryLogo from "../assets/Grocery_Logo.png";
import BottomNavBar from "../components/nav/BottomNavBar";

const List = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  async function getData() {
    try {
      const data = await OwnAPI.getGroceries(user);
      console.log(data);
      const a = data.filter((a) => a.display_tag != "deleted"); // filter the userdata to display no deleted one
      setUserData(a);
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
      <img src={groceryLogo} />
      <h1>My Grocery {user} List</h1>
      <div>
        <Link to="/search">
          <button className="btn-large">ADD ITEM</button>
        </Link>
        <button className="btn-lg-danger" onClick={() => deleteAll(userData)}>
          DELETE ALL
        </button>
      </div>
      <div>
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
