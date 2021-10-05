import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

function Inventory() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      This is inventory page
      {user}
      <button
        onClick={() => {
          // call logout
          setUser("24");
        }}
      >
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}

export default Inventory;
