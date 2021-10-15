import exp from "constants";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import SingleGrocery from "./SingleGrocery";

const GroceryItems = ({ userData }) => {
  const { user } = useContext(UserContext);

  if (!userData) return <div>No Grocery available!</div>;
  userData = userData.filter((a) => a.display_tag != "deleted"); // filter the userdata to display no deleted one

  return (
    <div>
      {Array.isArray(userData) &&
        userData.map((a) => (
          <SingleGrocery
            key={a.grocery_item_id}
            grocery_item_id={a.grocery_item_id}
            grocery_tag={a.grocery_tag}
            grocery_item_name={a.grocery_item_name}
            query_id={a.query_id}
            display_tag={a.display_tag}
          />
        ))}
    </div>
  );
};

export default GroceryItems;
