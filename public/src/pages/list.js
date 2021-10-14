import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GroceryItems from "../components/GroceryItem";
import UserContext from "../UserContext";
import OwnAPI from "../Api";

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
      <h1>My Grocery {user} List</h1>

      <Link to="/search">
        <button>Add Item</button>
      </Link>
      <button onClick={() => setUserData(null)}> Delete All</button>
      <GroceryItems userData={userData} />
    </div>
  );
};

export default List;
