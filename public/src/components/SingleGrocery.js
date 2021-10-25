import { useState, useContext, useEffect } from "react";
import OwnAPI from "../Api";
import UserContext from "../UserContext";
import { ReactComponent as DeleteBtn } from "../assets/Group_16.svg";
import { ReactComponent as Checkedbtn } from "../assets/checkedbtn.svg";
import { ReactComponent as NotCheckedbtn } from "../assets/notChekcedbtn.svg";
import x from "../assets/x.png";
import "../App.css";
import { store } from "react-notifications-component";
import AddItem from "./Notifications/addItem";
import RemoveItem from "./Notifications/removeItem";

const SingleGrocery = ({
  grocery_item_id,
  grocery_item_name,
  grocery_tag,
  display_tag,
  query_id = 16623,
  getData,
  setUserData,
  userData,
}) => {
  /*grab user id  */
  const { user } = useContext(UserContext);

  /* set the check, Checked to display the toggle button*/
  const [check, setChecked] = useState(true);

  /*check the  check status true or false*/
  useEffect(() => {
    function displayCheck() {
      if (grocery_tag === "bought") {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
    displayCheck();
  }, [grocery_tag]);
  /*handle Bought function, it is works now but need to add expiry time */
  async function handleBought(tag, user_id, item_id) {
    OwnAPI.editGroceryTag(tag, user_id, item_id); // update tage
    setChecked(!check);
    //getData();
    //handle notifications here
    if (tag === "bought") {
      store.addNotification({
        content: <AddItem item_name={grocery_item_name} location={"fridge"} />, // content:MyNotify (custom notification)
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false,
        },
      });
    } else if (tag === "not bought") {
      store.addNotification({
        content: <RemoveItem item_name={grocery_item_name} />, // content:MyNotify (custom notification)
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false,
        },
      });
    }
  }

  // need some functions to get expiry_time

  // handle simple delete
  async function singleDelete(tag, user_id, item_id) {
    OwnAPI.editGroceryDeleteTag(tag, user_id, item_id);
    getData(); // renew the list and it shows immediately
    const b = userData.filter((a) => a.grocery_tag !== "deleted"); // try to faster the delete function
    setUserData(b);
  }

  //const firstLetter = name.replace(/ .*/, "").toLowerCase();
  return (
    <div key={grocery_item_id} className="grocery-list-box">
      <div style={{ padding: "10px" }}>
        {check ? (
          <button
            style={{ border: "none", background: "white" }}
            onClick={() => handleBought("not bought", user, grocery_item_id)}
          >
            <Checkedbtn />
          </button>
        ) : (
          <button
            onClick={() => handleBought("bought", user, grocery_item_id)}
            style={{ border: "none", background: "white" }}
          >
            <NotCheckedbtn />
          </button>
        )}
      </div>
      {grocery_item_name.replace(/ .*/, "")}

      <button
        onClick={() => singleDelete("deleted", user, grocery_item_id)}
        className="deleteBtn"
      >
        <DeleteBtn />
      </button>
    </div>
  );
};
// write axios chain here to get the time, to add to refrigeter

export default SingleGrocery;
