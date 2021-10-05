import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const IMAGE_URL = "https://spoonacular.com/cdn/ingredients_250x250/";
//const SEARCH_URL = "https://food-ping.herokuapp.com/searchItem";
const guide_URL = "https://food-ping.herokuapp.com/getDetails";

/*  the search_url always show cors error i dont know what to do
 */

function Tips() {
  const { name } = useParams();
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function getID(id) {
      const { data } = await axios.get(guide_URL, {
        params: { query_id: id },
      });
      console.log(data);
      setDetails(data.tips);
    }
    getID(id);
  }, [id]);

  return (
    <div>
      <h1>{name} </h1>

      <img src={`${IMAGE_URL}/${name}`} alt={name} />
      <h2>Did you know?</h2>
      <p>{details}</p>
      <button>MARK US USED</button>
    </div>
  );
}

export default Tips;
