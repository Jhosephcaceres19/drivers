import React from "react";
import { Link } from "react-router-dom";
import "./Drivers.css";
import defaultImage from "../assets/image/depool.jpg";

export const Drivers = ({ drivers, currentPage, totalPages, onPageChange }) => {
  const handleError = (e) => {
    e.target.src = defaultImage;
  };

  console.log("Drivers data:", drivers); // Verifica los datos recibidos

  if (!Array.isArray(drivers)) {
    return <div>No hay conductores disponibles.</div>;
  }

  return (
    <div className="content-driver-main">
      <div className="content-driver">
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <Link
              key={driver.id}
              to={`/home/${driver.id}`}
              className="driver-card"
            >
              <img src={driver.image} alt={driver.name} onError={handleError} />
              <h2>NOMBRE: {driver.name ? driver.name: driver.forename}</h2> {/* Valor predeterminado si `name` está vacío */}
              <p>EQUIPO: {driver.teams.join(", ")}</p>
            </Link>
          ))
        ) : (
          <div>No se encontraron resultados.</div>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Atrás
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
