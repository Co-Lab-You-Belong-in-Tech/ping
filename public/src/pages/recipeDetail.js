import { useParams } from "react-router";
import { Link } from "react-router-dom";
import receipeLogo from "../assets/Recipe_Logo.png";

const RecipeDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <Link to="/recipes"> Back to Recipes</Link>
      <img src={receipeLogo} />
      <h1>My Recipes</h1>
      <p>Based on ingredients Left</p>

      {id}
    </div>
  );
};

export default RecipeDetails;
