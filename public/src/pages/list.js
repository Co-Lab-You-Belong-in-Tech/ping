import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GroceryItems from "../components/GroceryItem";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import groceryLogo from "../assets/Grocery_Logo.png";

const List = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const data = await OwnAPI.getGroceries(user);
        console.log(data);
        setUserData(data);
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, [user]);

  return (
    <div>
      <img src={groceryLogo} />
      <h1>My Grocery {user} List</h1>
      <div>
        <Link to="/search">
          <button className="btn-large">ADD ITEM</button>
        </Link>
        <button className="btn-lg-danger" onClick={() => setUserData(null)}>
          DELETE ALL
        </button>
      </div>
      <div>
        <GroceryItems userData={userData} />
      </div>
    </div>
  );
};

export default List;
