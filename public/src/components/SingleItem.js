import React from "react";

const SingleItem = ({ name, id }) => {
  const firstLetter = name.replace(/ .*/, "").toLowerCase();
  return (
    <div>
      {name}-{id}
      <small>
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
