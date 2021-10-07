import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <li>
        <Link to="/search">My List</Link>
      </li>
      <li>
        <Link to="/inventory">My Fridge</Link>
      </li>
      <li>Recipes</li>
    </div>
  );
}

export default NavBar;
