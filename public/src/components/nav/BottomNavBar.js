import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";

import { ReactComponent as RecipeUn } from "../../assets/RecipeUnselected.svg";
import { ReactComponent as RecipeS } from "../../assets/RecipeS.svg";
import { ReactComponent as GroceryS } from "../../assets/GroceryS.svg";
import { ReactComponent as GroceryY } from "../../assets/GroceryY.svg";
import { ReactComponent as Logout } from "../../assets/Logout.svg";
import FridgeNav from "./FridgeNav";

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
      default:
        history.push("/");
        break;
    }
  }, [activeTabs, history]);

  return (
    <div style={{ display: "inline-block" }}>
      <div style={{ display: "inline-block" }}>
        {activeTabs === "list" ? (
          <button onClick={() => setActiveTabs("list")}>
            <GroceryY />
          </button>
        ) : (
          <button onClick={() => setActiveTabs("list")}>
            <GroceryS />
          </button>
        )}
      </div>

      {activeTabs === "inventory" ? (
        <button onClick={() => setActiveTabs("inventory")}>
          <FridgeNav expiredItem={expiredItem} />
        </button>
      ) : (
        <button onClick={() => setActiveTabs("inventory")}>inventoryNot</button>
      )}

      <div style={{ display: "inline-block" }}>
        {activeTabs === "recipes" ? (
          <button onClick={() => setActiveTabs("recipes")}>
            <RecipeS />
          </button>
        ) : (
          <button onClick={() => setActiveTabs("recipes")}>
            <RecipeUn />
          </button>
        )}
      </div>

      <button onClick={() => handleLogout()}>
        <Logout />
      </button>
    </div>
  );
};

export default BottomNavBar;
