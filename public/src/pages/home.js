import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import validator from "validator";
import { login } from "./testLogin";
import NavBar from "../components/NavBar";
import { isNull } from "util";

function HomePage() {
  const { user, setUser } = useContext(UserContext); // use useContext to grab user id
  const initialState = { email: "" };
  const [formData, setFormData] = useState(initialState);
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
    alert(`${email}`);
    setFormData(initialState);

    //add some kind of login logic here
  };

  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("Valid Email :)");
    } else if (email === "") {
      setEmailError("it should not be empty!");
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

          <button>
            <Link to="/list">Start!</Link>
          </button>
        </form>
        {user}

        {user ? (
          <button
            onClick={() => {
              // call logout
              setUser(null);
            }}
          >
            logout
          </button>
        ) : (
          <button
            onClick={async () => {
              const user = await login();
              setUser(user.id);
            }}
          >
            login
          </button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
