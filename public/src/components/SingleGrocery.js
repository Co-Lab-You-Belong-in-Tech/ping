import { useState } from "react";
import OwnAPI from "../Api";

const SingleGrocery = ({
  grocery_item_id,
  grocery_item_name,
  grocery_tag,
  display_tag,
  query_id = 16623,
}) => {
  /*handle Bought function*/
  async function handleBought(
    item_name,
    user_id,
    expiry_time = "12232132",
    query_id = "16808"
  ) {
    OwnAPI.addFridge(item_name, user_id, expiry_time, query_id);
  }

  // need some functions to get expiry_time

  return (
    <div key={grocery_item_id}>
      <button onClick={() => handleBought(grocery_item_name, "5", query_id)}>
        {grocery_tag === "not bought" ? "x" : <span>&#10003;</span>}
      </button>
      {grocery_item_name}
      -----{query_id}
    </div>
  );
};
// write axios chain here to get the time, to add to refrigeter

export default SingleGrocery;
