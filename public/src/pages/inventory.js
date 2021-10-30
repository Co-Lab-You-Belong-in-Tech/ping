import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import FridgeArea from "../components/FridgeArea";
import logo from "../assets/Fridge_Logo.png";
import BottomNavBar from "../components/nav/BottomNavBar";
import Helper from "../hooks/Helpers";

const LIMIT = 5;

function Inventory() {
  const { user, setExpiredItems } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [list, setList] = useState(null);
  const [index, setIndex] = useState(LIMIT);

  useEffect(() => {
    async function getData() {
      try {
        const data = await OwnAPI.getTheUserInventory(user);
        const a = data.filter((a) => a.usage_tag === null);
        //console.log(a);
        //console.log(getExpiredArray(data));
        setExpiredItems(Helper.getExpiredArray(data)); /// need to rethink where put this function?

        // need to sort the data by the expiration date
        let sortedA = a.sort(
          (a, b) =>
            Date.parse(new Date(a.expiry_date.split("/").reverse().join("-"))) -
            Date.parse(new Date(b.expiry_date.split("/").reverse().join("-")))
        );

        setUserData(sortedA);
        setList(sortedA.slice(0, LIMIT));
        if (sortedA.length > LIMIT) {
          setShowMore(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, []);

  // loop through the data and find the expiration item and put them into array and set the expiration item appwide
  // logic:  if the itemtag is not expired , display here; if user click toss or used buttom they disapper from the page but change the tag in database

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
            src={logo}
            alt="grocery_logo"
            style={{ width: "84.36px", height: "84.36px" }}
          />
        </div>
        <div className="header-title" style={{ paddingLeft: "15%" }}>
          <h1>My Fridge</h1>
        </div>
      </div>

      <FridgeArea userData={list} />

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
      <BottomNavBar name="inventory" />
    </div>
  );
}

export default Inventory;
