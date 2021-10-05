import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import { login } from "./testLogin";

function HomePage() {
  let history = useHistory();
  const [email, setEmail] = useState(" ");
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <h1>Ping!</h1>
      <a
        className="App-link"
        href="/inventory"
        target="_blank"
        rel="noopener noreferrer"
      >
        Inventory
      </a>
      <a
        className="App-link"
        href="/tips"
        target="_blank"
        rel="noopener noreferrer"
      >
        tips
      </a>
      <a
        className="App-link"
        href="/search"
        target="_blank"
        rel="noopener noreferrer"
      >
        search
      </a>

      <div>
        <form>
          <input
            type="text"
            value={email}
            placeholder="Enter Your Email"
            onChange={({ target }) => setEmail(target.value)}
          />

          <button
            type="submit"
            onClick={() => {
              history.push("/inventory");
            }}
          >
            Get Start!
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
