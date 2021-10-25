import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import receipeLogo from "../assets/Recipe_Logo.png";
import axios from "axios";
import "../recipe.css";
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
    <div
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Link to="/recipes" className="recipe-back">
        <div style={{ paddingRight: "8px", display: "inline-block" }}>
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="7.99341"
              y="12.4766"
              width="1.69288"
              height="9.62083"
              rx="0.84644"
              transform="rotate(135.171 7.99341 12.4766)"
              fill="#2A9D8F"
            />
            <rect
              x="6.80298"
              width="1.69288"
              height="9.62083"
              rx="0.84644"
              transform="rotate(45 6.80298 0)"
              fill="#2A9D8F"
            />
          </svg>
        </div>
        Back to Recipes
      </Link>
      <div className="header-box">
        <div className="header-logo">
          <img
            src={receipeLogo}
            alt="recipe_logo"
            style={{ width: "84.36px", height: "84.36px" }}
          />
        </div>
        <div style={{ flexDirection: "row", paddingLeft: "13%" }}>
          <h1 style={{ padding: "5px" }}>My Recipes</h1>
          <p className="p-font">Based on ingredients Left</p>
        </div>
      </div>

      <h2 className="recipe-title" style={{ padding: "20px" }}>
        {theRecipe.title}
      </h2>

      <div>
        <h3 className="recipe-subtitle">Ingredients</h3>
        <ul className="recipe-in">
          <li>{getIngredients(theRecipe)}</li>
        </ul>
      </div>
      <div>
        <h3 className="recipe-subtitle">Instructions</h3>
        <ul className="recipe-in">
          {theRecipe.analyzedInstructions[0].steps.map((a) => (
            <li>{a.step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetails;
