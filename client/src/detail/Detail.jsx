import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";
import { NavBar } from "../navbar/NavBar";
import Service from "../service/Service";
import defaultImage from "../assets/image/depool.jpg";

export const Detail = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);

  const handleError = (e) => {
    e.target.src = defaultImage; // Cambia la fuente de la imagen al predeterminado
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await Service.driversId(id);
        console.log(response);
        setDriver(response.respuesta); // Access the driver details from `respuesta`
      } catch (error) {
        console.log("Error al obtener los detalles del driver", error);
      }
    };
    fetchDetail();
  }, [id]);

  if (!driver) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detail">
      <NavBar />
      <div className="content-detail">
        <h1>{driver.forename} {driver.surname}</h1>
        <h2>Nationality: {driver.nationality}</h2>
        <h2>Date of Birth: {driver.dob}</h2>
        <img src={driver.image} alt={driver.name} onError={handleError}/>
        <p>{driver.description}</p>
        <h3>Teams: {driver.teams.length > 0 ? driver.teams.join(', ') : 'No teams available'}</h3>
      </div>
    </div>
  );
};
