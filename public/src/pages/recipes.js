import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import receipeLogo from "../assets/Recipe_Logo.png";
import FridgeHolder from "../components/empty_holder/Fridge_holder";
import EmptyRecipe from "../assets/Empty_Recipe_Logo.png";
import UserContext from "../UserContext";
import RecipeItem from "../components/RecipeItem";
import "../App.css";

const RecipesPage = () => {
  const [recipeData, setRecipeData] = useState(null);
  const { expiredItem } = useContext(UserContext);

  useEffect(() => {
    async function getRecipe() {
      const { data } = await axios.get(
        "https://food-ping.herokuapp.com/getRecipes",
        {
          params: { ingredients: expiredItem, number: "4" },
        }
      );
      console.log(data);
      setRecipeData(data);
    }
    getRecipe();
  }, []);

  if (!recipeData)
    return (
      <div>
        <img src={receipeLogo} className="recipe-photo" />
        <h1>My Recipes</h1>
        <p>Based on ingredients Left</p>
        <FridgeHolder
          img={EmptyRecipe}
          title={"You dont have any receipes yet"}
          message={"Add item to your fridge to see recipe ideas"}
        />
      </div>
    );
  return (
    <div>
      <img src={receipeLogo} />
      <h1>My Recipes</h1>
      <p>Based on ingredients Left</p>

      {recipeData.map((a) => (
        <RecipeItem title={a.title} image={a.image} id={a.id} key={a.id} />
      ))}
    </div>
  );
};

export default RecipesPage;
