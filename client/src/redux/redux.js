import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice para manejar el estado de los conductores
const driversSlice = createSlice({
  name: 'drivers',
  initialState: {
    drivers: [], // Lista de todos los conductores
    filteredDrivers: [], // Lista de conductores filtrados por búsqueda o filtros aplicados
    currentPage: 1, // Página actual para la paginación
    totalPages: 1, // Total de páginas para la paginación
    searchTerm: '', // Término de búsqueda para filtrar conductores
    selectedTeam: '', // Equipo seleccionado para filtrar conductores
    sortOrder: 'asc', // Orden de clasificación (ascendente o descendente)
    sortBy: 'name', // Campo por el que se clasifica (nombre, año de nacimiento, etc.)
    teams: [], // Lista de equipos disponibles para filtrar
    selectedDriver: null, // Estado para el conductor seleccionado (detalles del conductor)
    driverLoading: false, // Estado de carga del conductor (cargando o no)
    driverError: null, // Estado para manejar errores en la carga del conductor
  },
  reducers: {
    // Reducers para manejar los conductores en general
    setDrivers(state, action) {
      state.drivers = action.payload; // Establece la lista de conductores
      state.filteredDrivers = action.payload; // También actualiza los conductores filtrados
      state.teams = [...new Set(action.payload.flatMap((driver) => driver.teams))]; // Actualiza la lista de equipos únicos
      state.totalPages = Math.ceil(action.payload.length / 9); // Calcula el total de páginas basado en 9 conductores por página
    },
    setFilteredDrivers(state, action) {
      state.filteredDrivers = action.payload; // Establece los conductores filtrados
      state.totalPages = Math.ceil(action.payload.length / 15); // Actualiza el total de páginas para los conductores filtrados
      state.currentPage = 1; // Reinicia la página actual a la primera página
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload; // Establece la página actual para la paginación
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload; // Establece el término de búsqueda
    },
    setSelectedTeam(state, action) {
      state.selectedTeam = action.payload; // Establece el equipo seleccionado para el filtro
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload; // Establece el orden de clasificación
    },
    setSortBy(state, action) {
      state.sortBy = action.payload; // Establece el campo por el que se clasifica
    },
    //****************************************************************************************************** */
    // Reducers para manejar el detalle del conductor (relacionado con el componente Detail)
    setSelectedDriver(state, action) {
      state.selectedDriver = action.payload; // Establece el conductor seleccionado en el estado
    },
    setDriverLoading(state, action) {
      state.driverLoading = action.payload; // Establece el estado de carga para el conductor
    },
    setDriverError(state, action) {
      state.driverError = action.payload; // Establece el mensaje de error si ocurre un problema al cargar el conductor
    },
    clearDriverDetail(state) {
      state.selectedDriver = null; // Limpia el conductor seleccionado
      state.driverLoading = false; // Resetea el estado de carga
      state.driverError = null; // Limpia el mensaje de error
    }
  }
});

export const {
  setDrivers,
  setFilteredDrivers,
  setCurrentPage,
  setSearchTerm,
  setSelectedTeam,
  setSortOrder,
  setSortBy,
  setSelectedDriver,
  setDriverLoading,
  setDriverError,
  clearDriverDetail
} = driversSlice.actions;

const store = configureStore({
  reducer: {
    drivers: driversSlice.reducer // Configura el store con el reducer para manejar el estado de los conductores
  }
});

export default store;
