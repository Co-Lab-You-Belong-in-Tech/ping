import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import receipeLogo from "../assets/Recipe_Logo.png";
import axios from "axios";
//import BottomNavBar from "../components/nav/BottomNavBar";

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
  }, [id]);

  //helper fucntion to get the clean list of ingredient from theRecipe Data
  function getIngredients(data) {
    let array = [];
    for (var i = 0; i < data.extendedIngredients.length; i++) {
      array.push(data.extendedIngredients[i].name);
    }
    return array.map((a) => <li>{a}</li>);
  }

  if (!theRecipe) return <div>Loading!</div>;
  return (
    <div>
      <Link to="/recipes"> Back to Recipes</Link>
      <img src={receipeLogo} alt="recipeLogo" />
      <h1>My Recipes</h1>
      <p>Based on ingredients Left</p>
      <h2>{theRecipe.title}</h2>

      <div>
        <h3>ingredients</h3>
        {theRecipe.extendedIngredients[0].name}
        {getIngredients(theRecipe)}
      </div>
      <div>
        <h3>Instructions</h3>
        {theRecipe.analyzedInstructions[0].steps.map((a) => (
          <li>{a.step}</li>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
