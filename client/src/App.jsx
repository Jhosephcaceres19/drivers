import React from "react";
import { NavBar } from "./navbar/NavBar";
import "./App.css";
import Image from "./assets/image/image.js";

export const App = () => {
  return (
    <div className="app-css">
      <NavBar />
      <div className="welcome">
        <h1>Bienvenido a Drivers</h1>
        <img src={Image.r} alt="Raptor" />
      </div>
    </div>
  );
};
