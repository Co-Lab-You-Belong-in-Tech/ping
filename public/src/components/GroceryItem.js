import exp from "constants";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import SingleGrocery from "./SingleGrocery";
import FridgeHolder from "./empty_holder/Fridge_holder";
import EmptyCartLogo from "../assets/EmptyCart_Logo.png";

const GroceryItems = ({ userData, getData }) => {
  const { user } = useContext(UserContext);

  if (!userData)
    return (
      <FridgeHolder
        img={EmptyCartLogo}
        title={"Your grocery list is empty"}
        message={"Tap Add item to add to your list"}
      />
    );

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
            getData={getData}
          />
        ))}
    </div>
  );
};

export default GroceryItems;
