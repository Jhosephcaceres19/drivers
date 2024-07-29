import React, { useState } from "react"; // Asegúrate de importar useState
import { Link } from "react-router-dom";
import "./Drivers.css";
import defaultImage from "../assets/image/depool.jpg"; // Corrige la importación si el nombre del archivo es incorrecto

export const Drivers = ({ drivers }) => {
  const handleError = (e) => {
    e.target.src = defaultImage; // Cambia la fuente de la imagen al predeterminado
  };

  return (
    <div className="content-driver">
      {drivers.map((driver) => (
        <Link
          key={driver.id}
          to={`/home/${driver.id}`}
          className="driver-card"
        >
          <img src={driver.image} alt={driver.name} onError={handleError}/>
          <h2>NOMBRE: {driver.name}</h2>
          <p>EQUIPO: {driver.teams.join(", ")}</p>
        </Link>
      ))}
    </div>
  );
};
