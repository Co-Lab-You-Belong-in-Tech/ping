import React from "react";

const RecipeItem = ({ id, image, title }) => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="recipe-container">
        <a className="details" href={`recipes/${id}`} rel="noopener noreferrer">
          <div className="recipe-image">
            <img
              src={image}
              style={{ width: 65, height: 65, left: 15 }}
              alt="receipe-img"
            />
          </div>
          <div className="recipe-name">
            <h4
              style={{
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: 14,
                alignItems: "center",
                color: "#424B5A",
              }}
            >
              {title}
            </h4>
          </div>
          <div className="recipe-icon">
            <small>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.0065918"
                  y="1.19336"
                  width="1.69288"
                  height="9.62083"
                  rx="0.84644"
                  transform="rotate(-44.8293 0.0065918 1.19336)"
                  fill="#2A9D8F"
                />
                <rect
                  x="1.19702"
                  y="13.6699"
                  width="1.69288"
                  height="9.62083"
                  rx="0.84644"
                  transform="rotate(-135 1.19702 13.6699)"
                  fill="#2A9D8F"
                />
              </svg>
            </small>
          </div>
        </a>
      </div>
      <hr />
    </div>
  );
};

export default RecipeItem;
