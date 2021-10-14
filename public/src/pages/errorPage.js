import React from "react";
import "../errorPage.css";
import sadFace from "../assets/sadFace.png";

const ErrorPage = () => {
  return (
    <div class="page-box">
      <img src={sadFace} />
      <h1>Oops!</h1>
      <div className="empty-msg">
        <h2>404 - PAGE NOT FOUND</h2>
        <h4>This page doesn't exist</h4>
      </div>

      <button className="btn-large">BACK TO HOMEPAGE</button>
    </div>
  );
};

export default ErrorPage;
