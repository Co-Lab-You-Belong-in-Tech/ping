import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import validator from "validator";
import OwnAPI from "../Api";
import Logo from "../assets/Logo_2.png";
import "../login.css";
//import { store } from "react-notifications-component";
//import LoginError from "../components/Notifications/loginError";
import Helper from "../hooks/Helpers";

function HomePage() {
  const { setUser, setExpiredItems } = useContext(UserContext); // use useContext to grab user id
  const initialState = { email: "" };
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const [emailError, setEmailError] = useState("");

  // login logic
  async function login(loginEmail) {
    try {
      let { data } = await OwnAPI.isUser(loginEmail);
      //console.log(data);
      setUser(data[0].user_id);
      history.push("/list");
      // local storage to make user login
      localStorage.setItem("currentUser", data[0].user_id);
      //get the expired Items
      const b = await OwnAPI.getTheUserInventory(data[0].user_id);
      const getNotUsedItems = b.filter((a) => a.usage_tag === null);
      const c = Helper.getExpiredArray(getNotUsedItems);
      setExpiredItems(c);
    } catch (errors) {
      console.error("log in failed");
      console.log(errors.Error);

      setEmailError("Email address does not exist.Please try again.");

      setUser("2");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
    validateEmail(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = formData;
    //alert(`${email}`);
    setFormData(initialState);
    login(email);
  };

  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError("Valid Email :)");
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  return (
    <div className="login">
      <div className="login-logo">
        <img
          src={Logo}
          alt="logo"
          style={{ width: "75px", height: "95px", zIndex: "99" }}
        ></img>
      </div>
      <div className="slogan">
        <p>Deliciously simple.</p>
      </div>
      <h1 className="app-name">Karrot</h1>
      <div className="email-error">
        <span
          style={{
            fontWeight: "700",
            color: "#e76f51",
            fontSize: "12px",
            lineHeight: "18px",
            textAlign: "center",
          }}
        >
          {emailError}
        </span>
      </div>

      <div className="login-form">
        <form
          onSubmit={handleSubmit}
          style={{ alignItems: "center", display: "flex" }}
        >
          <label htmlFor="email"></label>
          <input
            type="email"
            placeholder="   Email Address"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />

          <button type="submit" disabled={formData.email.length < 1} id="login">
            LOGIN
          </button>
        </form>
      </div>
      <div className="login-p">
        <h5>
          Don't have an accout? <a href="/signup">Sign up here.</a>
        </h5>
      </div>
    </div>
  );
}

export default HomePage;
