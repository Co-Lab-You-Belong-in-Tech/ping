import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import receipeLogo from "../assets/Recipe_Logo.png";
import FridgeHolder from "../components/empty_holder/Fridge_holder";
import EmptyRecipe from "../assets/Empty_Recipe_Logo.png";
import UserContext from "../UserContext";
import RecipeItem from "../components/RecipeItem";
import "../App.css";
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

  if (!recipeData)
    return (
      <div>
        <div>
        <div style={{display: "table-cell", width: 100, verticalAlign: "middle"}}>
          <img src={receipeLogo} alt="recipe_logo" style={{width: "10vw"}}/>
        </div>
        <div style={{display: "table-cell", width: 500, verticalAlign: "middle"}}>
          <h1 style={{color: "#424B5A", fontFamily: "Inter", fontStyle: "normal", fontWeight: "bold", fontSize: 24, alignItems: "center", textAlign: "center"}}>My Recipes</h1>
          <p style={{color: "#C2D1D9", fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: 12, alignItems: "center", textAlign: "center"}}>Based on leftovers in your fridge</p>
        </div>
        </div>
        <FridgeHolder
          img={EmptyRecipe}
          title={"You dont have any receipes yet"}
          message={"Add item to your fridge to see recipe ideas"}
        />
      </div>
    );
  return (
    <div>
      <div style={{margin: 122}}>
      <div style={{display: "table-cell", width: "20%", verticalAlign: "middle"}}>
        <img src={receipeLogo} alt="recipe_logo" style={{width: "10vw"}}/>
      </div>
      <div style={{display: "table-cell", width: "80%", verticalAlign: "middle"}}>
        <h1 style={{color: "#424B5A", fontFamily: "Inter", fontStyle: "normal", fontWeight: "bold", fontSize: 24, alignItems: "center", textAlign: "center"}}>My Recipes</h1>
        <p style={{color: "#C2D1D9", fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: 12, alignItems: "center", textAlign: "center"}}>Based on leftovers in your fridge</p>
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
