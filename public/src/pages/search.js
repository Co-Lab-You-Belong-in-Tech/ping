import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import SingleItem from "../components/SingleItem";
import OwnAPI from "../Api";
import UserContext from "../UserContext";
import { store } from "react-notifications-component";

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
  function addGrocery(item_name, user_id) {
    try {
      OwnAPI.addGrocery(item_name, user_id);
      console.log(item_name, user_id);
      store.addNotification({
        title: "Hey!",
        message: `success add ${item_name}!`, // content:MyNotify (custom notification)
        type: "success",
        insert: "top",
        container: "top-right",
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
      {user}
      <input
        type="text"
        onChange={(e) => onChangeHandler(e.target.value)}
        value={text}
      />
      {text && veggieID && (
        <button onClick={() => addGrocery(text, user)}>Add</button>
      )}
      {suggestions &&
        suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            onClick={() => onSuggestHandler(suggestion.name, suggestion.id)}
          >
            {suggestion.id}--{suggestion.name}
          </div>
        ))}
      {text && veggieID && <SingleItem name={text} id={veggieID} />}
    </div>
  );
}

export default SearchPage;
