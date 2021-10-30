import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import receipeLogo from "../assets/Recipe_Logo.png";
import FridgeHolder from "../components/empty_holder/Fridge_holder";
import EmptyRecipe from "../assets/Empty_Recipe_Logo.png";
import UserContext from "../UserContext";
import RecipeItem from "../components/RecipeItem";
import "../recipe.css";
import BottomNavBar from "../components/nav/BottomNavBar";

const LENGTH = 50; // IT IS THE DATA LOADING LENGTH
const LIMIT = 3; // IT IS THE EVERY TIME LOAD 3 MORE

const RecipesPage = () => {
  const [recipeData, setRecipeData] = useState(null);
  const { expiredItem } = useContext(UserContext);
  const [showMore, setShowMore] = useState(true);
  const [list, setList] = useState(null);
  const [index, setIndex] = useState(LIMIT);

  useEffect(() => {
    async function getRecipe() {
      const { data } = await axios.get(
        "https://food-ping.herokuapp.com/getRecipes",
        {
          params: { ingredients: expiredItem, number: LENGTH },
        }
      );
      //console.log(data);
      setRecipeData(data);
      setList(data.slice(0, LIMIT));
    }
    getRecipe();
  }, []);

  /**LOAD MORE BUTTON */

  const loadMore = () => {
    const newIndex = index + LIMIT;
    const newShowMore = newIndex < LENGTH - 1;
    const newList = list.concat(recipeData.slice(index, newIndex));
    setIndex(newIndex);
    setList(newList);
    setShowMore(newShowMore);
  };

  if (!recipeData || recipeData.length === 0 || !list || list.length === 0)
    return (
      <div>
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
            <p className="p-font">Based on leftovers in your fridge</p>
          </div>
        </div>

        <FridgeHolder
          img={EmptyRecipe}
          title={"You don't have any receipes yet"}
          message={"Add item to your fridge to see recipe ideas"}
        />
        <BottomNavBar name="recipes" />
      </div>
    );
  return (
    <div>
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
      <div
        style={{
          paddingTop: "45px",
          paddingBottom: "45px",
        }}
      >
        {list.map((a) => (
          <RecipeItem title={a.title} image={a.image} id={a.id} key={a.id} />
        ))}
      </div>

      {showMore && (
        <button onClick={loadMore} className="load-more">
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="12.4766"
              y="0.00683594"
              width="1.69288"
              height="9.62083"
              rx="0.84644"
              transform="rotate(45.1707 12.4766 0.00683594)"
              fill="#2A9D8F"
            />
            <rect
              y="1.19678"
              width="1.69288"
              height="9.62083"
              rx="0.84644"
              transform="rotate(-45 0 1.19678)"
              fill="#2A9D8F"
            />
          </svg>
        </button>
      )}
      <BottomNavBar name="recipes" />
    </div>
  );
};

export default RecipesPage;
