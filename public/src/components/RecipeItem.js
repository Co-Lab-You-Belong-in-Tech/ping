import React from "react";

const RecipeItem = ({ id, image, title }) => {
  return (
    <div>
      <div>
        <img src={image} />
      </div>
      {id}---{title}
      <small>
        <a
          className="App-link"
          href={`recipes/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          RecipeDetails
        </a>
      </small>
    </div>
  );
};

export default RecipeItem;
