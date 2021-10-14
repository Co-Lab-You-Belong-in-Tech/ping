import React from "react";
import NavBar from "../components/NavBar";
import receipeLogo from "../assets/Recipe_Logo.png";

const RecipesPage = () => {
  return (
    <div>
      <img src={receipeLogo} />
      <h1>My Recipes</h1>
      <p>Based on ingredients Left</p>
    </div>
  );
};

export default RecipesPage;
