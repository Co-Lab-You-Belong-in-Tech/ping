import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GroceryItems from "../components/GroceryItem";
import NavBar from "../components/NavBar";
import UserContext from "../UserContext";

const List = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>My Grocery {user} List</h1>

      <Link to="/search">
        <button>Add Item</button>
      </Link>
      <button> Delete Checked Items</button>
      <GroceryItems />
      <NavBar />
    </div>
  );
};

export default List;
