import Logo from "../assets/Logo.png";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import OwnAPI from "../Api";
import validator from "validator";

const Signup = () => {
  const { setUser } = useContext(UserContext); // use useContext to grab user id
  const initialState = { email: "" };
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  // create new user logic
  async function signup(signupEmail) {
    try {
      let data = await OwnAPI.addUser(signupEmail);
      //console.log(data);

      setUser(data[0].user_id);
    } catch (errors) {
      console.error("signup failed,temporay set user 2");
      setUser("2");
    }
  }

  /*handle change*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
    validateEmail(e);
  };

  /*handle submit*/
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = formData;
    //alert(`${email}`);
    setFormData(initialState);
    signup(email);
    history.push("/list"); // right now it push user to login again but ideally the add user will return user_id
  };

  /*validate email*/
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
        <img src={Logo} alt="logo" />
      </div>

      <span
        style={{
          fontWeight: "bold",
          color: "#e76f51",
        }}
        className="email-error"
      >
        {emailError}
      </span>
      <div className="login-form">
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
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

          <button
            type="submit"
            disabled={formData.email.length < 1}
            id="signup"
          >
            SIGN UP
          </button>
        </form>
      </div>

      <div className="signup-p">
        <h5>
          Back to <a href="/">login.</a>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
