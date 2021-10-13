import React, { useContext } from "react";
import OwnAPI from "../Api";
import UserContext from "../UserContext";

const FridgeItem = ({
  expiry_date,
  inventory_item_name,
  inventory_tag,
  query_id,
  inventory_item_id,
}) => {
  const { user } = useContext(UserContext);
  function calTime(time) {
    var currentDate = new Date();
    var time = new Date(time);
    var one_day = 1000 * 60 * 60 * 24;
    var result = Math.abs(time - currentDate) / one_day;
    return Math.floor(result);
  }

  // hanlde mark as used button

  async function handleUsed(tag, user_id, item_id) {
    OwnAPI.editFridge(tag, user_id, item_id);
  }

  return (
    <div>
      <li>
        {inventory_item_id}
        {inventory_item_name} --- {inventory_tag} in {calTime(expiry_date)} Days
        <small>
          <a
            className="App-link"
            href={`tips/${inventory_item_name}/${query_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            tips
          </a>
        </small>
        <button onClick={() => handleUsed("used", user, inventory_item_id)}>
          Mark as used
        </button>
        <button onClick={() => handleUsed("expired", user, inventory_item_id)}>
          Toss
        </button>
      </li>
    </div>
  );
};

export default FridgeItem;
