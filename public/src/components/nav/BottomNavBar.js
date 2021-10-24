import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
//import { Link } from "react-router-dom";
import UserContext from "../../UserContext";

import { ReactComponent as RecipeUn } from "../../assets/RecipeUnselected.svg";
import { ReactComponent as RecipeS } from "../../assets/RecipeS.svg";
import { ReactComponent as GroceryS } from "../../assets/GroceryS.svg";
import { ReactComponent as GroceryY } from "../../assets/GroceryY.svg";
import { ReactComponent as Logout } from "../../assets/Logout.svg";
import FridgeNav from "./FridgeNav";
import FridgeNot from "./FridgeNot";

const BottomNavBar = (props) => {
  const history = useHistory();
  const { setUser, expiredItem } = useContext(UserContext);
  const [activeTabs, setActiveTabs] = useState(props.name);

  /**this is the function handle logout, setUser null and push history to "/" */
  function handleLogout() {
    setUser(null);
    setActiveTabs("logout");
  }

  useEffect(() => {
    switch (activeTabs) {
      case "home":
        history.push("/");
        break;
      case "list":
        history.push("/list");
        break;
      case "inventory":
        history.push("/inventory");
        break;
      case "recipes":
        history.push("/recipes");
        break;
      case "logout":
        history.push("/");
        break;
      case "search":
        history.push("/search");
        break;
      default:
        history.push("/");
        break;
    }
  }, [activeTabs, history]);

  return (
    <div className="nav">
      <div className="nav-item">
        {activeTabs === "list" ? (
          <button onClick={() => setActiveTabs("list")} className="nav-btn">
            <GroceryY />
          </button>
        ) : (
          <button onClick={() => setActiveTabs("list")} className="nav-btn">
            <GroceryS />
          </button>
        )}
      </div>
      <div className="nav-item">
        {activeTabs === "inventory" ? (
          <button
            onClick={() => setActiveTabs("inventory")}
            className="nav-btn"
          >
            <FridgeNav expiredItem={expiredItem} />
          </button>
        ) : (
          <button
            onClick={() => setActiveTabs("inventory")}
            className="nav-btn"
          >
            <FridgeNot expiredItem={expiredItem} />
          </button>
        )}
      </div>
      <div className="nav-item">
        {activeTabs === "recipes" ? (
          <button onClick={() => setActiveTabs("recipes")} className="nav-btn">
            <RecipeS />
          </button>
        ) : (
          <button onClick={() => setActiveTabs("recipes")} className="nav-btn">
            <RecipeUn />
          </button>
        )}
      </div>
      <div className="nav-item">
        <button onClick={() => handleLogout()} className="nav-btn">
          <Logout />
        </button>
      </div>
    </div>
  );
};

export default BottomNavBar;
