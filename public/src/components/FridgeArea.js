import React from "react";
import FridgeItem from "./FridgeItem";

// this is the fridge area for place holder to hold all single fridge items

const FridgeArea = ({ userData }) => {
  if (!userData) return <div>Nononononono!</div>;
  return (
    <div>
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
