import React from "react";
import FridgeHolder from "./empty_holder/Fridge_holder";
import FridgeItem from "./FridgeItem";
import emptyfridge from "../assets/Empty_Fridge_Logo.png";

// this is the fridge area for place holder to hold all single fridge items

const FridgeArea = ({ userData }) => {
  if (!userData)
    return (
      <FridgeHolder
        img={emptyfridge}
        message={"Check items off your grocery list to add to your fridge"}
        title={"Your fridge is empty"}
      />
    );
  return (
    <div>
      <button className="btn-large">MARK AS USED</button>
      <button className="btn-lg-danger"> TOSS </button>

      {Array.isArray(userData) &&
        userData.map((a) => (
          <FridgeItem
            expiry_date={a.expiry_date}
            inventory_item_name={a.inventory_item_name}
            inventory_tag={a.inventory_tag}
            query_id={a.query_id}
            inventory_item_id={a.inventory_item_id}
            key={a.inventory_item_id}
          />
        ))}
    </div>
  );
};

export default FridgeArea;
