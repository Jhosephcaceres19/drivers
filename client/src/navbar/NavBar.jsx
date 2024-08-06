import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import iconMain2 from "../assets/icon/coche.png"; // Importa el icono directamente

export const NavBar = () => {
  return (
    <div className="gradient-background">
      <div>
        <Link to='/'>
          <img src={iconMain2} alt="" />
        </Link>
      </div>
      <div className="h1-home">
        <Link to= '/home'>
          <h1>Inicio</h1>
        </Link>
      </div>
    </div>
  );
};
