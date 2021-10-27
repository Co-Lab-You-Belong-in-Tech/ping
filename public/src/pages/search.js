import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import SingleItem from "../components/SingleItem";
import OwnAPI from "../Api";
import UserContext from "../UserContext";
import { store } from "react-notifications-component";
import AddItem from "../components/Notifications/addItem";
import BottomNavBar from "../components/nav/BottomNavBar";
import "../search.css";

function SearchPage() {
  const [veggie, setVeggie] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [veggieID, setVeggieID] = useState([""]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getVeggie() {
      const { data } = await axios.get(
        "https://food-ping.herokuapp.com/searchItem", // i need a route to provide same data as https://shelf-life-api.herokuapp.com/search
        {
          params: { item: "fresh" },
        }
      );
      console.log(data);
      setVeggie(data);
    }
    getVeggie();
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = veggie.filter((a) => {
        const regex = new RegExp(`${text}`, "gi");
        return a.name.match(regex);
      });
    }
    console.log(matches);
    setSuggestions(matches);
    setText(text);
  };

  const onSuggestHandler = (text, id) => {
    setText(text);
    setVeggieID(id);
    setSuggestions([]);
  };
  console.log(veggieID);

  /** we get the veggigID and search  */

  /***add grocery function */
  function addGrocery(item_name, user_id, query_id) {
    try {
      OwnAPI.addGrocery(item_name, user_id, query_id);
      console.log(item_name, user_id);
      store.addNotification({
        content: <AddItem item_name={item_name} location="list" />, // content:MyNotify (custom notification)
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false,
        },
      });
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div>
      <div className="search-container">
      <div className="search-icon">
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="6" stroke="#A1AEB7" stroke-width="2"/>
      <line x1="11.4142" y1="12" x2="15" y2="15.5858" stroke="#A1AEB7" stroke-width="2" stroke-linecap="round"/>
      </svg>
      </div>
      <div className="search-bar">
      <input
        className="search-input"
        type="text"
        onChange={(e) => onChangeHandler(e.target.value)}
        value={text}
      />
      </div>
      <div className="search-button">
      {text && veggieID}
      <button className="btn-add" onClick={() => addGrocery(text, user, veggieID)}><p className="btn-name">Add</p></button>
      </div>
      {suggestions &&
        suggestions.map((suggestion) => (
          <div className="suggestion"
            key={suggestion.id}
            onClick={() => onSuggestHandler(suggestion.name, suggestion.id)}
          >
            {suggestion.name}
          </div>
        ))}
      {/*text && veggieID && <SingleItem name={text} id={veggieID} />*/}
      </div>
      <div className="empty-container">
        <h2 className="empty-title">Search for items to add</h2>
        <h5 className="empty-subtitle">Tap on the search bar to look for ingredients</h5>
      </div>
      <BottomNavBar name="search" />
    </div>
  );
}

export default SearchPage;
