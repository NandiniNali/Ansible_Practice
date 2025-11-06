import React from "react";
import BuddyBest from "./components/BuddyBest.jsx";
import "./components/style.css";

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🧺 BuddyBucket – Friendship Goals</h1>
      </header>

      <main>
        <BuddyBest />
      </main>

      <footer className="app-footer">
        {/* Optional footer content */}
      </footer>
    </div>
  );
};

export default App;
