import React from "react";

const IMAGE_URL = "https://spoonacular.com/cdn/ingredients_250x250/";

const SingleItem = ({ name, id }) => {
  const firstLetter = name.replace(/ .*/, "").toLowerCase();
  return (
    <div>
      {name}-{id}
      <img src={`${IMAGE_URL}/${firstLetter}`} alt={firstLetter} />
      <small>
        {" "}
        <a
          className="App-link"
          href={`tips/${firstLetter}/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          tips
        </a>
      </small>
    </div>
  );
};

export default SingleItem;
