import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function HomePage() {
  let history = useHistory();
  const [email, setEmail] = useState(" ");
  return (
    <div>
      <h1>Ping Project</h1>
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
      this is a email form
      <div>
        <form>
          <input
            type="text"
            value={email}
            placeholder="enter a Email"
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
      </div>
    </div>
  );
}

export default HomePage;
