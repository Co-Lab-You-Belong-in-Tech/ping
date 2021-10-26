import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../UserContext";
import { ReactComponent as GroceryS } from "../../assets/GroceryS.svg";
import { ReactComponent as RecipeUn } from "../../assets/RecipeUnselected.svg";
import { ReactComponent as Logout } from "../../assets/Logout.svg";
import FridgeNot from "./FridgeNot";

const RecipeNavBar = () => {
  const { setUser, expiredItem } = useContext(UserContext);
  const history = useHistory();

  /**this is the function handle logout, setUser null and push history to "/" */
  function handleLogout() {
    setUser(null);
    localStorage.clear(); // set the localstorage null
  }

  return (
    <div className="nav" style={{ zIndex: "100" }}>
      <div className="nav-item">
        <button onClick={() => history.push("/list")} className="nav-btn">
          <GroceryS />
        </button>
      </div>
      <div className="nav-item">
        <button onClick={() => history.push("/inventory")} className="nav-btn">
          <FridgeNot expiredItem={expiredItem} />
        </button>
      </div>
      <div className="nav-item">
        <button onClick={() => history.push("/recipe")} className="nav-btn">
          <RecipeUn />
        </button>
      </div>
      <div className="nav-item">
        <button onClick={() => handleLogout()} className="nav-btn">
          <Logout />
        </button>
      </div>
    </div>
  );
};

export default RecipeNavBar;
