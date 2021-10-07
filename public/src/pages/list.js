import React from "react";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <div>
      <h1>My Grocery List</h1>
      <button>
        <Link to="/search">ADD ITEM</Link>
      </button>
    </div>
  );
};

export default List;
