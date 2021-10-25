import React from "react";
import "../errorPage.css";
import sadFace from "../assets/sadFace.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="page-box">
      <div id="sad-face">
        <img src={sadFace} alt="sadFace" />
      </div>
      <h1>Oops!</h1>
      <div className="empty-msg">
        <h3>404 - PAGE NOT FOUND</h3>
        <p className="error-p">This page doesn't exist</p>
      </div>

      <button className="error-btn">
        <Link to="/list" className="btn-link">
          BACK TO HOMEPAGE
        </Link>
      </button>
    </div>
  );
};

export default ErrorPage;
