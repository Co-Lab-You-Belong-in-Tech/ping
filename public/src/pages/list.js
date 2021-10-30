import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GroceryItems from "../components/GroceryItem";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import groceryLogo from "../assets/Grocery_Logo.png";
import BottomNavBar from "../components/nav/BottomNavBar";
import "../App.css";

const LIMIT = 5; // IT IS THE EVERY TIME LOAD 5 MORE

const List = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [list, setList] = useState(null);
  const [index, setIndex] = useState(LIMIT);

  //get data
  async function getData() {
    try {
      const data = await OwnAPI.getGroceries(user);
      const a = data.filter((a) => a.display_tag !== "deleted"); // filter the userdata to display no deleted one
      //console.log(a);
      let sortedA = a.sort((b, a) => a.grocery_item_id - b.grocery_item_id); // sort the data by the grocery_item_id
      setUserData(sortedA);
      setList(sortedA.slice(0, LIMIT));
      if (sortedA.length > LIMIT) {
        setShowMore(true);
      }
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getData();
  }, [user]);

  function deleteAll(userData) {
    //alert("deleting in progress!!!");
    let array = [];
    for (var i = 0; i < userData.length; i++) {
      array.push(userData[i].grocery_item_id);
    }
    console.log(array);
    OwnAPI.editGroceryDeleteTag("deleted", user, array); //call api to delete all
    setUserData(null);
    setList(null);
  }

  /**LOAD MORE BUTTON */

  const loadMore = () => {
    const newIndex = index + LIMIT;
    const newShowMore = newIndex < userData.length - 1;
    const newList = list.concat(userData.slice(index, newIndex));
    setIndex(newIndex);
    setList(newList);
    setShowMore(newShowMore);
  };

  return (
    <div>
      <div className="header-box">
        <div className="header-logo">
          <img
            src={groceryLogo}
            alt="grocery_logo"
            style={{ width: "84.36px", height: "84.36px" }}
          />
        </div>
        <div className="header-title">
          <h1>My Grocery List</h1>
        </div>
      </div>
      <div style={{ paddingTop: "2%" }}>
        <Link to="/search">
          <button className="btn-large">ADD ITEM</button>
        </Link>
        <button className="btn-lg-danger" onClick={() => deleteAll(userData)}>
          DELETE ALL
        </button>
      </div>
      <div style={{ top: "0" }}>
        <GroceryItems
          userData={list}
          getData={getData}
          setUserData={setUserData}
        />
      </div>

      {showMore && (
        <button onClick={loadMore} className="load-more">
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="12.4766"
              y="0.00683594"
              width="1.69288"
              height="9.62083"
              rx="0.84644"
              transform="rotate(45.1707 12.4766 0.00683594)"
              fill="#2A9D8F"
            />
            <rect
              y="1.19678"
              width="1.69288"
              height="9.62083"
              rx="0.84644"
              transform="rotate(-45 0 1.19678)"
              fill="#2A9D8F"
            />
          </svg>
        </button>
      )}
      <BottomNavBar name="list" />
    </div>
  );
};

export default List;
