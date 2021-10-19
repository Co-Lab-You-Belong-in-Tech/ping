import React, { useContext, useState, useEffect } from "react";
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
  usage_tag,
  tagArray,
  setTagArray,
}) => {
  const { user } = useContext(UserContext);

  /*set the selected status*/

  const [select, setSelected] = useState(true);

  useEffect(() => {
    function displaySelected() {
      const b = tagArray.includes(inventory_item_id);
      setSelected(b);
    }
    displaySelected();
  }, []);

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

  function handleClick(item_id) {
    if (tagArray.includes(item_id)) return; // avoid duplicate data
    setTagArray([...tagArray, item_id]);
    setSelected(!select);
    console.log(tagArray);
    //console.log(b);
  }

  function handleRemove(item_id) {
    const arr = [...tagArray].filter((x) => x !== item_id);
    setSelected(!select);
    setTagArray(arr);
    console.log(tagArray);
  }

  return (
    <div>
      {select ? (
        <button
          onClick={() => {
            handleClick(inventory_item_id);
          }}
        >
          yes
        </button>
      ) : (
        <button
          onClick={() => {
            handleRemove(inventory_item_id);
          }}
        >
          no
        </button>
      )}
      {usage_tag}
      {inventory_item_id}
      {inventory_item_name}
      {inventory_tag === "not expired" ? "expires in " : "already expired for "}
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
    </div>
  );
};

export default FridgeItem;
