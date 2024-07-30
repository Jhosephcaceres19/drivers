import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";
import { NavBar } from "../navbar/NavBar";
import Service from "../service/Service";
import defaultImage from "../assets/image/depool.jpg";

export const Detail = () => {
  const { id, idDB } = useParams(); // Obtén ambos parámetros de la URL
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleError = (e) => {
    e.target.src = defaultImage; // Cambia la fuente de la imagen al predeterminado si falla
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        let driverId = id;
        let response = await Service.driversId(driverId);
        
        if (response && response.respuesta && response.respuesta.error) {
          // Si el ID no es válido, intenta con idDB
          if (idDB) {
            driverId = idDB;
            response = await Service.driversId(driverId);
          } else {
            throw new Error('No se encontraron datos para el driver.');
          }
        }

        if (response && response.respuesta) {
          setDriver(response.respuesta); // Accede al detalle del driver
        } else {
          throw new Error('No se encontraron datos para el driver.');
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles del driver", error);
        setError("No se pudieron cargar los detalles del conductor.");
        setLoading(false);
      }
    };
    
    fetchDetail();
  }, [id, idDB]); // Dependencias para la actualización

  if (loading) {
    return <div>Cargando...</div>; // Mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <div>{error}</div>; // Mensaje de error si ocurre algún problema
  }

  // Verifica que `driver` tenga todas las propiedades necesarias antes de renderizar
  const {
    forename = "No disponible",
    surname = "No disponible",
    nationality = "No disponible",
    dob = "No disponible",
    image = defaultImage,
    description = "No disponible",
    teams = [],
  } = driver || {};

  return (
    <div className="detail">
      <NavBar />
      <div className="content-detail">
        <h1>{forename} {surname}</h1>
        <h2>Nacionalidad: {nationality}</h2>
        <h2>Fecha de Nacimiento: {dob}</h2>
        <img src={image} alt={`${forename} ${surname}`} onError={handleError} />
        <p>{description}</p>
        <h3>Equipos: {teams.length > 0 ? teams.join(', ') : 'No hay equipos disponibles'}</h3>
      </div>
    </div>
  );
};
