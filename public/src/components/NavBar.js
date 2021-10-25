import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { store } from "react-notifications-component";
//import "animate.css/animate.min.css";  // i didnt find this animate css???

function NavBar() {
  const { setUser, expiredItem } = useContext(UserContext); // use useContext to grab user id

  /**this is the react notifications part */

  const handleClick = () => {
    store.addNotification({
      message: `Your ${expiredItem} is expired!`, // content:MyNotify (custom notification)
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
  };

  // need t do something here to handle no expiredItem error
  if (expiredItem.length === undefined) {
    console.log("length undefined");
  }
  return (
    <div>
      <li>
        <Link to="/list">My List</Link>
      </li>
      <li>
        {expiredItem.length > 0 && (
          <Link to="/inventory" onClick={handleClick}>
            My Fridge
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {expiredItem.length > 0 ? expiredItem.length : ""}
            </span>
          </Link>
        )}
        {expiredItem.length === 0 && <Link to="/inventory">Fridge</Link>}
      </li>
      <li>
        <Link to="/recipes">Recipes</Link>
      </li>
      <li>
        <Link
          to="/"
          onClick={() => {
            // call logout
            setUser(null);
          }}
        >
          logout
        </Link>
      </li>
    </div>
  );
}

export default NavBar;
