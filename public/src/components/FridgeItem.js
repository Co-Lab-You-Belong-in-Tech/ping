import React from "react";

const FridgeItem = ({
  expiry_date,
  inventory_item_name,
  inventory_tag,
  query_id,
  inventory_item_id,
}) => {
  function calTime(time) {
    var currentDate = new Date();
    var time = new Date(time);
    var one_day = 1000 * 60 * 60 * 24;
    var result = Math.abs(time - currentDate) / one_day;
    return Math.floor(result);
  }
  return (
    <div>
      <li>
        {inventory_item_id}
        {inventory_item_name} --- Expire in {calTime(expiry_date)} Days ---
        <small>{inventory_tag}</small>
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
        <button>Mark as used</button>
        <button>Toss</button>
      </li>
    </div>
  );
};

export default FridgeItem;
