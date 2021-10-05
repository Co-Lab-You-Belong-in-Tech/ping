import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { login } from "./testLogin";

function HomePage() {
  const [email, setEmail] = useState(" ");
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <h1>Ping!</h1>
      <Link to="/inventory">Inventory</Link>

      <div>
        <form>
          <input
            type="text"
            value={email}
            placeholder={"Enter Your Email"}
            onChange={({ target }) => setEmail(target.value)}
          />

          <button type="submit">
            <Link to="/search">Start!</Link>
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
