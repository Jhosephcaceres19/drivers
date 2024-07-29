import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavBar } from "../navbar/NavBar";
import Service from "../service/Service";
import { Drivers } from "./Drivers";
import { Link } from "react-router-dom";

export const Home = () => {
  // Asegúrate de que la variable 'drivers' esté definida aquí
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await Service.allDrivers();
        // Asegúrate de acceder a la propiedad 'respuesta' correctamente
        setDrivers(response.respuesta);
      } catch (error) {
        console.log("Error al cargar los conductores", error);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="home">
      <NavBar />
      
      <div className="content-home">
        <div>
            <Link to="/add">Registrar..</Link>
        </div>
        <br />
        {/* Asegúrate de pasar la variable 'drivers' al componente 'Drivers' */}
        <Drivers drivers={drivers} />
      </div>
    </div>
  );
};
