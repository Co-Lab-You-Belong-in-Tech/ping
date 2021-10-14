import { useState, useContext } from "react";
import OwnAPI from "../Api";
import UserContext from "../UserContext";

const SingleGrocery = ({
  grocery_item_id,
  grocery_item_name,
  grocery_tag,
  display_tag,
  query_id = 16623,
}) => {
  /*grab user id  */
  const { user } = useContext(UserContext);
  /*handle Bought function, it is works now but need to add expiry time */
  async function handleBought(
    item_name,
    user_id,
    expiry_time = "12232132",
    query_id = "16808"
  ) {
    OwnAPI.addFridge(item_name, user_id, expiry_time, query_id); // talk to anita about update the tag?
  }

  // need some functions to get expiry_time

  return (
    <div key={grocery_item_id}>
      <button onClick={() => handleBought(grocery_item_name, user, query_id)}>
        {grocery_tag === "not bought" ? "x" : <span>&#10003;</span>}
      </button>
      {grocery_item_name}
      -----{query_id}
    </div>
  );
};
// write axios chain here to get the time, to add to refrigeter

export default SingleGrocery;
