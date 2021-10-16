import React from "react";

const RecipeItem = ({ id, image, title }) => {
  return (
    <div>
      <div>
        <img src={image} />
      </div>
      {id}---{title}
    </div>
  );
};

export default RecipeItem;
