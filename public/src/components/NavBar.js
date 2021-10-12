import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function NavBar() {
  const { user, setUser, expiredItem, setExpiredItem } =
    useContext(UserContext); // use useContext to grab user id
  return (
    <div>
      <li>
        <Link to="/list">My List</Link>
      </li>
      <li>
        <Link to="/inventory">
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
