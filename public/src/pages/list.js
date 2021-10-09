import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import UserContext from "../UserContext";

const List = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>My Grocery {user} List</h1>
      <button>
        <Link to="/search">ADD ITEM</Link>
      </button>
      <NavBar />
    </div>
  );
};

export default List;
