import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const IMAGE_URL = "https://spoonacular.com/cdn/ingredients_250x250/";
const SEARCH_URL = "https://food-ping.herokuapp.com/searchItem";

/*  the search_url always show cors error i dont know what to do
 */

function Tips() {
  const { name } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function getID(name) {
      const { data } = await axios.get(SEARCH_URL, {
        params: { item: name },
      });
      console.log(data);
      setDetails(data[0].id);
    }
    getID(name);
  }, [name]);

  return (
    <div>
      <h1>{name} </h1>

      <img src={`${IMAGE_URL}/${name}`} alt={name} />
      <h2>Did you know?</h2>
      <h3>{details} </h3>
      <button>MARK US USED</button>
    </div>
  );
}

export default Tips;