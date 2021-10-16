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
          href={`recipe/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          tips
        </a>
      </small>
    </div>
  );
};

export default RecipeItem;
