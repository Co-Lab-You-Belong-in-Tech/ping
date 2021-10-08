import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleItem from "../components/SingleItem";
import NavBar from "../components/NavBar";

function SearchPage() {
  const [veggie, setVeggie] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [veggieID, setVeggieID] = useState([""]);

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

  return (
    <div>
      <input
        type="text"
        onChange={(e) => onChangeHandler(e.target.value)}
        value={text}
      />
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
      {text && veggieID && <button>Add</button>}
      <NavBar />
    </div>
  );
}

export default SearchPage;
