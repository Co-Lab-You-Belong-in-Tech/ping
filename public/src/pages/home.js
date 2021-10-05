import React from "react";

function HomePage() {
  return (
    <div>
      <p>Ping Project</p>
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
    </div>
  );
}

export default HomePage;
