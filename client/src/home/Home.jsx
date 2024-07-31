import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavBar } from "../navbar/NavBar";
import Service from "../service/Service";
import { Drivers } from "./Drivers";
import { Link } from "react-router-dom";

export const Home = () => {
  // Estados para gestionar los datos de los conductores, filtros, y paginación
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [teams, setTeams] = useState([]);

  // Efecto para cargar los datos de los conductores al montar el componente
  useEffect(() => {
    fetchDrivers();
  }, []);

  // Efecto para aplicar filtros y ordenamientos cuando cambian los estados relacionados
  useEffect(() => {
    applyFiltersAndSorting();
  }, [selectedTeam, sortOrder, sortBy, drivers]);

  // Función para obtener los datos de los conductores desde el servicio
  const fetchDrivers = async () => {
    try {
      const response = await Service.allDrivers();
      const driversData = response.respuesta;
      console.log("Fetched drivers:", driversData);
      setDrivers(driversData);
      setFilteredDrivers(driversData);
      // Extraer equipos únicos para los filtros
      setTeams([...new Set(driversData.flatMap((driver) => driver.teams))]);
      setTotalPages(Math.ceil(driversData.length / 15)); // Establecer el número total de páginas
    } catch (error) {
      console.log("Error al cargar los conductores", error);
    }
  };

  // Función para aplicar filtros y ordenamientos a los datos de los conductores
  const applyFiltersAndSorting = () => {
    // Filtrar por equipo seleccionado
    let results = drivers.filter((driver) =>
      selectedTeam ? driver.teams.includes(selectedTeam) : true
    );

    // Ordenar según el criterio seleccionado
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
    setTotalPages(Math.ceil(results.length / 15)); // Actualizar el número total de páginas después de filtrar y ordenar
    setCurrentPage(1); // Reiniciar la página actual a la primera
  };

  // Función para manejar la búsqueda de conductores por nombre
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

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Función para manejar el cambio de página en la paginación
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Función para obtener los conductores de la página actual
  const getPaginatedDrivers = () => {
    const startIndex = (currentPage - 1) * 15; // Cambiado de 9 a 15 para ajustar el número de elementos por página
    const endIndex = startIndex + 15;
    return filteredDrivers.slice(startIndex, endIndex);
  };

  // Función para limpiar la búsqueda y restablecer los filtros
  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedTeam("");
    setCurrentPage(1);
    fetchDrivers(); // Volver a cargar los datos de los conductores para restablecer el estado
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
