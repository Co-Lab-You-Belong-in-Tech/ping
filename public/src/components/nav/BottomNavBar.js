import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const BottomNavBar = (props) => {
  const history = useHistory();
  const [activeTabs, setActiveTabs] = useState(props.name);
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
    <div>
      <li>
        {activeTabs === "list" ? (
          <button onClick={() => setActiveTabs("list")}> List</button>
        ) : (
          <button onClick={() => setActiveTabs("list")}>listNot</button>
        )}
      </li>
      <li>
        {activeTabs === "inventory" ? (
          <button onClick={() => setActiveTabs("inventory")}>inventory</button>
        ) : (
          <button onClick={() => setActiveTabs("inventory")}>
            inventoryNot
          </button>
        )}
      </li>
      <li>
        {activeTabs === "recipes" ? (
          <button onClick={() => setActiveTabs("recipes")}>recipes</button>
        ) : (
          <button onClick={() => setActiveTabs("recipes")}>recipeNot</button>
        )}
      </li>
      <li>
        {activeTabs === "logout" ? (
          <button onClick={() => setActiveTabs("logout")}>logout</button>
        ) : (
          <button onClick={() => setActiveTabs("logout")}>logoutNot</button>
        )}
      </li>
    </div>
  );
};

export default BottomNavBar;
