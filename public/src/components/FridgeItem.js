import React, { useContext, useState, useEffect } from "react";
//import reactNotificationsComponent from "react-notifications-component";
import OwnAPI from "../Api";
import UserContext from "../UserContext";
import { store } from "react-notifications-component";
import FridgeExpireTag from "./FridgeExpireTag";
import { ReactComponent as Checkedbtn } from "../assets/checkedbtn.svg";
import { ReactComponent as NotCheckedbtn } from "../assets/notChekcedbtn.svg";

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
    <div className="grocery-list-box">
      <div style={{ padding: "10px" }}>
        {select === false ? (
          <button
            onClick={() => {
              handleClick(inventory_item_id);
            }}
            style={{ border: "none", background: "white" }}
          >
            <NotCheckedbtn />
          </button>
        ) : (
          <button
            onClick={() => {
              handleRemove(inventory_item_id);
            }}
            style={{ border: "none", background: "white" }}
          >
            <Checkedbtn />
          </button>
        )}
      </div>
      {inventory_item_name.replace(/ .*/, "")}
      <div
        style={{
          position: "absolute",
          left: "68%",
          fontSize: "12px",
        }}
      >
        <FridgeExpireTag
          inventory_tag={inventory_tag}
          expiry_date={expiry_date}
        />
      </div>
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
