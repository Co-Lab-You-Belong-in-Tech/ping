import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import FridgeHolder from "./empty_holder/Fridge_holder";
import FridgeItem from "./FridgeItem";
import emptyfridge from "../assets/Empty_Fridge_Logo.png";
import OwnAPI from "../Api";
import { store } from "react-notifications-component";
import LargeNtf from "./Notifications/largeNotify";
import LargeToss from "./Notifications/largeToss";
import SmUsed from "./Notifications/smallUsed";
import SmTossed from "./Notifications/smallTossed";

// this is the fridge area for place holder to hold all single fridge items

const FridgeArea = ({ userData }) => {
  const [tagArray, setTagArray] = useState([]); // tags for multi-selected items
  const { user } = useContext(UserContext); // grab user id

  async function handleUsageTag(tag, user_id, item_id_array) {
    if (item_id_array === null) {
      window.alert("you must make some choices.");
    }
    OwnAPI.editFridgeUsage(tag, user_id, item_id_array);
    if (tag === "used") {
      store.addNotification({
        content: <SmUsed />, // content:MyNotify (custom notification), pass value and function into
        type: "success",
        insert: "top",
        container: "top-center",
        // animationIn: ["animate__animated", "animate__fadeIn"],
        //animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false,
          showIcon: true,
        },
      });
    } else if (tag === "tossed") {
      store.addNotification({
        content: <SmTossed />, // content:MyNotify (custom notification), pass value and function into
        type: "success",
        insert: "top",
        container: "top-center",
        // animationIn: ["animate__animated", "animate__fadeIn"],
        //animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false,
          showIcon: true,
        },
      });
    }
  }

  if (!userData || userData.length === 0)
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
    <div style={{ backgroundColor: "white" }}>
      <div style={{ padding: "2%" }}>
        <button
          className="btn-large"
          onClick={() => {
            store.addNotification({
              content: (
                <LargeNtf
                  tagArray={tagArray}
                  handleUsageTag={handleUsageTag}
                  user={user}
                />
              ), // content:MyNotify (custom notification), pass value and function into
              type: "success",
              insert: "top",
              container: "center",
              // animationIn: ["animate__animated", "animate__fadeIn"],
              //animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 2000,
                onScreen: true,
                showIcon: true,
              },
            });
          }}
        >
          MARK AS USED
        </button>
        <button
          className="btn-lg-danger"
          onClick={() => {
            store.addNotification({
              content: (
                <LargeToss
                  tagArray={tagArray}
                  handleUsageTag={handleUsageTag}
                  user={user}
                />
              ), // content:MyNotify (custom notification)
              type: "success",
              insert: "top",
              container: "center",
              // animationIn: ["animate__animated", "animate__fadeIn"],
              //animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 2000,
                onScreen: true,
                showIcon: true,
              },
            });
          }}
        >
          TOSS
        </button>
      </div>

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
