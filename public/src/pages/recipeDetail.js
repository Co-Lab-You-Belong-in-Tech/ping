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
      <Link to="/recipes" style={{textDecoration: "none"}}>
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7.99341" y="12.4766" width="1.69288" height="9.62083" rx="0.84644" transform="rotate(135.171 7.99341 12.4766)" fill="#2A9D8F"/>
        <rect x="6.80298" width="1.69288" height="9.62083" rx="0.84644" transform="rotate(45 6.80298 0)" fill="#2A9D8F"/>
      </svg>
       Back to Recipes</Link>
      <img src={receipeLogo} alt="recipeLogo" />
      <h1 style={{color: "#424B5A", fontFamily: "Inter", fontStyle: "normal", fontWeight: "bold", fontSize: 24, alignItems: "center", textAlign: "center"}}>My Recipes</h1>
      <p style={{color: "#C2D1D9", fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: 12, alignItems: "center", textAlign: "center"}}>Based on leftovers in your fridge</p>
      <h2>{theRecipe.title}</h2>

      <div>
        <h3 style={{width: 310, height: 16}}>Ingredients</h3>
        <ul style={{listStyleType: "none"}}>
        <li style={{textAlign: "left"}}>{getIngredients(theRecipe)}</li>
        </ul>
      </div>
      <div>
        <h3 style={{width: 310, height: 16}}>Instructions</h3>
        <ul style={{listStyleType: "none"}}>
        {theRecipe.analyzedInstructions[0].steps.map((a) => (
          <li style={{textAlign: "left"}}>{a.step}</li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetails;
