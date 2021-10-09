import exp from "constants";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import SingleGrocery from "./SingleGrocery";

const GroceryItems = () => {
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
  }, []);

  if (!userData) return <div>No Grocery available!</div>;
  return (
    <div>
      {userData.map((a) => (
        <SingleGrocery
          grocery_item_id={a.grocery_item_id}
          grocery_tag={a.grocery_tag}
          grocery_item_name={a.grocery_item_name}
        />
      ))}
    </div>
  );
};

export default GroceryItems;
