import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import receipeLogo from "../assets/Recipe_Logo.png";
import FridgeHolder from "../components/empty_holder/Fridge_holder";
import EmptyRecipe from "../assets/Empty_Recipe_Logo.png";
import UserContext from "../UserContext";
import RecipeItem from "../components/RecipeItem";
import "../recipe.css";
import BottomNavBar from "../components/nav/BottomNavBar";

const RecipesPage = () => {
  const [recipeData, setRecipeData] = useState(null);
  const { expiredItem } = useContext(UserContext);

  useEffect(() => {
    async function getRecipe() {
      const { data } = await axios.get(
        "https://food-ping.herokuapp.com/getRecipes",
        {
          params: { ingredients: expiredItem, number: "3" },
        }
      );
      console.log(data);
      setRecipeData(data);
    }
    getRecipe();
  }, []);

  if (!recipeData || !expiredItem || recipeData.length === 0)
    return (
      <div>
        <div className="header-box">
          <div className="header-logo">
            <img src={receipeLogo} alt="recipe_logo" />
          </div>
          <div style={{ flexDirection: "row", paddingLeft: "13%" }}>
            <h1 style={{ padding: "5px" }}>My Recipes</h1>
            <p className="p-font">Based on ingredients Left</p>
          </div>
        </div>


        <FridgeHolder
          img={EmptyRecipe}
          title={"You dont have any receipes yet"}
          message={"Add item to your fridge to see recipe ideas"}
        />
        <BottomNavBar name="recipes" />
      </div>
    );
  return (
    <div>
      <div className="header-container">
        <div className="logo">
          <img className="recipe-logo" src={receipeLogo} alt="recipe_logo"/>
        </div>
        <div className="header">
          <h1 className="header-title">My Recipes</h1>
          <p className="header-subtitle">Based on leftovers in your fridge</p>
        </div>
      </div>
      {recipeData.map((a) => (
        <RecipeItem title={a.title} image={a.image} id={a.id} key={a.id} />
      ))}

      <BottomNavBar name="recipes" />
    </div>
  );
};

export default RecipesPage;
