import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import validator from "validator";
import OwnAPI from "../Api";
import Logo from "../assets/Logo.png";
import "../login.css";
import { store } from "react-notifications-component";
import LoginError from "../components/Notifications/loginError";

function HomePage() {
  const { user, setUser } = useContext(UserContext); // use useContext to grab user id
  const initialState = { email: "" };
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  // login logic
  async function login(loginEmail) {
    try {
      let { data } = await OwnAPI.isUser(loginEmail);
      console.log(data);
      setUser(data[0].user_id);
      history.push("/list");
      // local storage to make user login
      localStorage.setItem("currentUser", data[0].user_id);
    } catch (errors) {
      console.error("log in failed");
      console.log(errors.Error);

      store.addNotification({
        content: <LoginError message={`${errors}`} />, // content:MyNotify (custom notification), pass value and function into
        type: "success",
        insert: "top",
        container: "top-center",
        // animationIn: ["animate__animated", "animate__fadeIn"],
        //animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false,
          showIcon: true,
        },
      });

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

  const [emailError, setEmailError] = useState("");
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
        <img src={Logo} alt="logo"></img>
      </div>
      <div className="slogan">
        <p>Deliciously simple.</p>
      </div>
      <h1 className="app-name">Karrot</h1>
      <div className="email-error">
        <span
          style={{
            fontWeight: "bold",
            color: "#e76f51",
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
