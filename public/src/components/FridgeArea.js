import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import FridgeHolder from "./empty_holder/Fridge_holder";
import FridgeItem from "./FridgeItem";
import emptyfridge from "../assets/Empty_Fridge_Logo.png";
import OwnAPI from "../Api";

// this is the fridge area for place holder to hold all single fridge items

const FridgeArea = ({ userData }) => {
  const [tagArray, setTagArray] = useState([]); // tags for multi-selected items
  const { user } = useContext(UserContext); // grab user id

  async function handleUsageTag(tag, user_id, item_id_array) {
    OwnAPI.editFridgeUsage(tag, user_id, item_id_array);
    setTagArray([]);
  }

  if (!userData)
    return (
      <div>
        <FridgeHolder
          img={emptyfridge}
          message={"Check items off your grocery list to add to your fridge"}
          title={"Your fridge is empty"}
        />
      </div>
    );

  return (
    <div>
      <button
        className="btn-large"
        onClick={() => handleUsageTag("used", user, tagArray)}
      >
        MARK AS USED
      </button>
      <button
        className="btn-lg-danger"
        onClick={() => handleUsageTag("tossed", user, tagArray)}
      >
        TOSS
      </button>

      {Array.isArray(userData) &&
        userData.map((a) => (
          <FridgeItem
            expiry_date={a.expiry_date}
            inventory_item_name={a.inventory_item_name}
            inventory_tag={a.inventory_tag}
            query_id={a.query_id}
            inventory_item_id={a.inventory_item_id}
            key={a.inventory_item_id}
            usage_tag={a.usage_tag}
            tagArray={tagArray}
            setTagArray={setTagArray}
          />
        ))}
    </div>
  );
};

export default FridgeArea;
