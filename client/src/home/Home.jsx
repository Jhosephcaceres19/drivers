import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavBar } from "../navbar/NavBar";
import Service from "../service/Service";
import { Drivers } from "./Drivers";
import { Link } from "react-router-dom";

export const Home = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await Service.allDrivers();
        setDrivers(response.respuesta);
        setFilteredDrivers(response.respuesta);
        setTotalPages(Math.ceil(response.respuesta.length / 15));
      } catch (error) {
        console.log("Error al cargar los conductores", error);
      }
    };
    fetchDrivers();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/drivers/driver?name=${searchTerm}`);
      const result = await response.json();
      
      if (Array.isArray(result.answer)) {
        setFilteredDrivers(result.answer);
        setTotalPages(Math.ceil(result.answer.length / 15));
        setCurrentPage(1); // Reiniciar a la primera página
      } else {
        console.log("El formato de los resultados no es el esperado", result);
        setFilteredDrivers([]);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (error) {
      console.log("Error al buscar conductores", error);
      setFilteredDrivers([]);
      setTotalPages(1);
      setCurrentPage(1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPaginatedDrivers = () => {
    const startIndex = (currentPage - 1) * 15;
    const endIndex = startIndex + 15;
    return filteredDrivers.slice(startIndex, endIndex);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredDrivers(drivers);
    setTotalPages(Math.ceil(drivers.length / 15));
    setCurrentPage(1);
  };

  return (
    <div className="home">
      <NavBar />
      <div className="content-home">
        <div>
          <div><Link to="/add">Registrar..</Link></div>
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            placeholder="Buscar por nombre"
          />
          <button onClick={handleSearch}>Buscar</button>
          <button onClick={handleClearSearch}>Limpiar </button>
        </div>
        <br />
        <Drivers 
          drivers={getPaginatedDrivers()} 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
