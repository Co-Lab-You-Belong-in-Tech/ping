import React from "react";
import NavBar from "../components/NavBar";
import receipeLogo from "../assets/Recipe_Logo.png";
import FridgeHolder from "../components/empty_holder/Fridge_holder";
import EmptyRecipe from "../assets/Empty_Recipe_Logo.png";

const RecipesPage = () => {
  return (
    <div>
      <img src={receipeLogo} />
      <h1>My Recipes</h1>
      <p>Based on ingredients Left</p>
      <FridgeHolder
        img={EmptyRecipe}
        title={"You dont have any receipes yet"}
        message={"Add item to your fridge to see recipe ideas"}
      />
    </div>
  );
};

export default RecipesPage;
