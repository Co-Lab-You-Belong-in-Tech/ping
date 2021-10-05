import React, { useContext } from "react";
import UserContext from "../UserContext";

function Inventory() {
  const { user } = useContext(UserContext);
  return (
    <div>
      This is inventory page
      {user}
    </div>
  );
}

export default Inventory;
