import React from "react";
import { Link } from "react-router-dom";
import "./Drivers.css";
import defaultImage from "../assets/image/depool.jpg";

// Componente Drivers para mostrar una lista de conductores con paginación
export const Drivers = ({ drivers, currentPage, totalPages, onPageChange }) => {
  // Maneja errores de carga de imagen, mostrando una imagen predeterminada si ocurre un error
  const handleError = (e) => {
    e.target.src = defaultImage;
  };

  console.log("Drivers data:", drivers); // Verifica los datos recibidos

  // Verifica si `drivers` es un array, si no lo es, muestra un mensaje indicando que no hay conductores disponibles
  if (!Array.isArray(drivers)) {
    return <div>No hay conductores disponibles.</div>;
  }

  return (
    <div className="content-driver-main">
      <div className="content-driver">
        {/* Verifica si hay conductores para mostrar */}
        {drivers.length > 0 ? (
          // Mapea los conductores y muestra una tarjeta para cada uno
          drivers.map((driver) => (
            <Link
              key={driver.id}
              to={`/home/${driver.id}`} // Enlace a la página de detalles del conductor
              className="driver-card"
            >
              <img
                src={driver.image} // Imagen del conductor
                alt={driver.name} // Texto alternativo de la imagen
                onError={handleError} // Manejador de errores de imagen
              />
              <h2>
                NOMBRE: {driver.name ? driver.name : driver.forename + ' ' + driver.surname}
                {/* Muestra el nombre del conductor, o un valor predeterminado si `name` está vacío */}
              </h2>
              <p>EQUIPO: {driver.teams.join(", ")}</p>
              {/* Muestra los equipos a los que pertenece el conductor */}
            </Link>
          ))
        ) : (
          // Mensaje cuando no se encuentran resultados
          <div>No se encontraron resultados.</div>
        )}
      </div>

      <div className="pagination">
        {/* Botón para cambiar a la página anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1} // Deshabilita el botón si ya estamos en la primera página
        >
          Atrás
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        {/* Botón para cambiar a la página siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages} // Deshabilita el botón si ya estamos en la última página
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
