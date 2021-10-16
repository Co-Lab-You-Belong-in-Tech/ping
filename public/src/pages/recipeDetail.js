import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import receipeLogo from "../assets/Recipe_Logo.png";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();

  const [theRecipe, setTheRecipe] = useState(null);

  useEffect(() => {
    async function getRecipe() {
      const { data } = await axios.get(
        `https://food-ping.herokuapp.com/getRecipeInfo?query_id=${id}`
      );
      console.log(data);
      setTheRecipe(data);
    }
    getRecipe();
  }, []);

  if (!theRecipe) return <div>Loading!</div>;
  return (
    <div>
      <Link to="/recipes"> Back to Recipes</Link>
      <img src={receipeLogo} />
      <h1>My Recipes</h1>
      <p>Based on ingredients Left</p>
    </div>
  );
};

export default RecipeDetails;
