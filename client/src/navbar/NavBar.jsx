import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <div className="gradient-background">
      <div>
        <Link to='/'>
          <h1>Drivers</h1>
        </Link>
      </div>
      <div className="h1-home">
        <Link>
          <h1>Home</h1>
        </Link>
      </div>
    </div>
  );
};
