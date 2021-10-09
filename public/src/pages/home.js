import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import validator from "validator";
import { login } from "./testLogin";
import OwnAPI from "../Api";

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
    } catch (errors) {
      console.error("log in failed,temporay set user 5");
      setUser("5");
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
    history.push("/list");

    //add some kind of login logic here
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
    <div>
      <h1>KARROT</h1>

      <div>
        <span
          style={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          {emailError}
        </span>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />

          <button type="submit" disabled={formData.email.length < 1}>
            Start!
          </button>
        </form>
        {user}
      </div>
    </div>
  );
}

export default HomePage;
