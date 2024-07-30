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
  const [selectedTeam, setSelectedTeam] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [selectedTeam, sortOrder, sortBy, drivers]);

  const fetchDrivers = async () => {
    try {
      const response = await Service.allDrivers();
      const driversData = response.respuesta;
      console.log("Fetched drivers:", driversData); // Debug
      setDrivers(driversData);
      setFilteredDrivers(driversData);
      setTeams([...new Set(driversData.flatMap((driver) => driver.teams))]);
      setTotalPages(Math.ceil(driversData.length / 15));
    } catch (error) {
      console.log("Error al cargar los conductores", error);
    }
  };

  const applyFiltersAndSorting = () => {
    let results = drivers.filter((driver) =>
      selectedTeam ? driver.teams.includes(selectedTeam) : true
    );

    if (sortBy === "name") {
      results.sort((a, b) => {
        if (a.name < b.name) return sortOrder === "asc" ? -1 : 1;
        if (a.name > b.name) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    } else if (sortBy === "dob") {
      results.sort((a, b) => {
        const dateA = new Date(a.dob);
        const dateB = new Date(b.dob);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    setFilteredDrivers(results);
    setTotalPages(Math.ceil(results.length / 15));
    setCurrentPage(1); // Reiniciar a la primera página
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/drivers/driver?name=${searchTerm}`
      );
      const result = await response.json();

      if (Array.isArray(result.answer)) {
        setDrivers(result.answer);
        applyFiltersAndSorting(); // Aplicar filtros y ordenamientos a los resultados de búsqueda
      } else {
        console.log("El formato de los resultados no es el esperado", result);
        setDrivers([]);
        setFilteredDrivers([]);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (error) {
      console.log("Error al buscar conductores", error);
      setDrivers([]);
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
    const startIndex = (currentPage - 1) * 9; // Cambiado de 9 a 15
    const endIndex = startIndex + 9; // Cambiado de 9 a 15
    return filteredDrivers.slice(startIndex, endIndex);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedTeam("");
    setCurrentPage(1);
    fetchDrivers(); // Re-fetch drivers to reset state
  };

  return (
    <div className="home">
      <NavBar />
      <div className="content-home">
        <div className="home-nav">
          <div className="filter-sort">
            <div className="filter-sort">
              <label>Filtrar por equipo:</label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="todos"
              >
                <option value="">Todos</option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-sort">
              <label>Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="todos"
              >
                <option value="name">Nombre</option>
                <option value="dob">Fecha de nacimiento</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="todos"
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>
          </div>
          <div className="filter-sort">
            <div className="search2">
              <button><Link to="/add" className="b">Registrar..</Link></button>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre"
              className="sea"
            />
            <button onClick={handleSearch}>Buscar</button>
            <button onClick={handleClearSearch}>Limpiar</button>
          </div>
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
