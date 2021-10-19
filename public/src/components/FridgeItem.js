import React, { useContext } from "react";
//import reactNotificationsComponent from "react-notifications-component";
import OwnAPI from "../Api";
import UserContext from "../UserContext";
import { store } from "react-notifications-component";

const FridgeItem = ({
  expiry_date,
  inventory_item_name,
  inventory_tag,
  query_id,
  inventory_item_id,
}) => {
  const { user } = useContext(UserContext);
  function calTime(t) {
    var currentDate = new Date();
    var time = new Date(t);
    var one_day = 1000 * 60 * 60 * 24;
    var result = Math.abs(time - currentDate) / one_day;
    return Math.floor(result);
  }

  // hanlde mark as used button

  async function handleUsed(tag, user_id, item_id) {
    try {
      OwnAPI.editFridge(tag, user_id, item_id);
      store.addNotification({
        title: "Hey!",
        message: `success add ${tag}!`, // content:MyNotify (custom notification)
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false,
        },
      });
    } catch (e) {
      console.error(e);
      store.addNotification({
        title: "Hey!",
        message: `unfortunately there are errors.`, // content:MyNotify (custom notification)
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false,
        },
      });
    }
  }

  return (
    <div>
      <li>
        {inventory_item_id}
        {inventory_item_name} ---{" "}
        {inventory_tag === "not expired"
          ? "expiring in "
          : "already expired for "}
        {calTime(expiry_date)} Days
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
