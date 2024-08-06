// src/components/Home.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { NavBar } from "../navbar/NavBar";
import Service from "../service/Service";
import { Drivers } from "./Drivers";
import { Link } from "react-router-dom";
import {
  setDrivers,
  setFilteredDrivers,
  setCurrentPage,
  setSearchTerm,
  setSelectedTeam,
  setSortOrder,
  setSortBy
} from "../redux/redux";

export const Home = () => {
  const dispatch = useDispatch(); // Hook para despachar acciones a Redux
  const {
    drivers,
    filteredDrivers,
    currentPage,
    totalPages,
    searchTerm,
    selectedTeam,
    sortOrder,
    sortBy,
    teams
  } = useSelector((state) => state.drivers); // Hook para seleccionar el estado de Redux
  useEffect(() => {
    fetchDrivers(); // Carga los conductores al montar el componente
  }, []);
  useEffect(() => {
    applyFiltersAndSorting(); // Aplica filtros y ordenamiento cuando cambian filtros o el listado de conductores
  }, [selectedTeam, sortOrder, sortBy, drivers]);

  const fetchDrivers = async () => {
    try {
      const response = await Service.allDrivers(); // Obtiene la lista de conductores desde el servicio
      const driversData = response.respuesta;
      dispatch(setDrivers(driversData)); // Actualiza el estado global con los conductores
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

    dispatch(setFilteredDrivers(results)); // Actualiza el estado global con los conductores filtrados y ordenados
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/drivers/driver?name=${searchTerm}`
      );
      const result = await response.json();

      if (Array.isArray(result.answer)) {
        dispatch(setDrivers(result.answer)); // Actualiza el estado global con los resultados de búsqueda
        applyFiltersAndSorting(); // Vuelve a aplicar filtros y ordenamiento
      } else {
        console.log("El formato de los resultados no es el esperado", result);
        dispatch(setDrivers([])); // Limpia la lista de conductores si los resultados no son los esperados
        dispatch(setFilteredDrivers([]));
      }
    } catch (error) {
      console.log("Error al buscar conductores", error);
      dispatch(setDrivers([])); // Limpia la lista de conductores en caso de error
      dispatch(setFilteredDrivers([]));
    }
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value)); // Actualiza el término de búsqueda en el estado global
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Valida la página
    dispatch(setCurrentPage(page)); // Actualiza la página actual en el estado global
  };

  const getPaginatedDrivers = () => {
    const startIndex = (currentPage - 1) * 9; // Calcula el índice inicial para la página actual
    const endIndex = startIndex + 9; // Calcula el índice final
    return filteredDrivers.slice(startIndex, endIndex); // Devuelve los conductores correspondientes a la página actual
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm("")); // Limpia el término de búsqueda
    dispatch(setSelectedTeam("")); // Limpia el equipo seleccionado
    dispatch(setCurrentPage(1)); // Reinicia la página a la primera
    fetchDrivers(); // Vuelve a cargar todos los conductores
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
                onChange={(e) => dispatch(setSelectedTeam(e.target.value))} // Actualiza el equipo seleccionado en el estado global
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
                onChange={(e) => dispatch(setSortBy(e.target.value))} // Actualiza el criterio de clasificación en el estado global
                className="todos"
              >
                <option value="name">Nombre</option>
                <option value="dob">Fecha de nacimiento</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => dispatch(setSortOrder(e.target.value))} // Actualiza el orden de clasificación en el estado global
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
              onChange={handleSearchChange} // Actualiza el término de búsqueda en el estado global
              placeholder="Buscar por nombre"
              className="sea"
            />
            <button onClick={handleSearch}>Buscar</button>
            <button onClick={handleClearSearch}>Limpiar</button>
          </div>
        </div>
        <br />
        <Drivers
          drivers={getPaginatedDrivers()} // Pasa los conductores paginados al componente Drivers
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange} // Pasa la función para cambiar de página al componente Drivers
        />
      </div>
    </div>
  );
};
