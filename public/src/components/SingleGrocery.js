import { useState, useContext, useEffect } from "react";
import OwnAPI from "../Api";
import UserContext from "../UserContext";
import { ReactComponent as DeleteBtn } from "../assets/Group_16.svg";
import "../App.css";

const SingleGrocery = ({
  grocery_item_id,
  grocery_item_name,
  grocery_tag,
  display_tag,
  query_id = 16623,
  getData,
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
  }, []);
  /*handle Bought function, it is works now but need to add expiry time */
  async function handleBought(tag, user_id, item_id) {
    OwnAPI.editGroceryTag(tag, user_id, item_id); // update tage
    setChecked(!check);
    getData();
  }

  // need some functions to get expiry_time

  // handle simple delete
  async function singleDelete(tag, user_id, item_id) {
    OwnAPI.editGroceryDeleteTag(tag, user_id, item_id);
    getData(); // renew the list and it shows immediately
  }

  //const firstLetter = name.replace(/ .*/, "").toLowerCase();
  return (
    <div key={grocery_item_id}>
      {check ? (
        <button
          onClick={() => handleBought("not bought", user, grocery_item_id)}
        >
          <span>&#10003;</span>
        </button>
      ) : (
        <button onClick={() => handleBought("bought", user, grocery_item_id)}>
          x
        </button>
      )}
      {grocery_tag}---
      {grocery_item_name.replace(/ .*/, "").toLowerCase()}
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
