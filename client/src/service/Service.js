import api from "../api/api"

const allDrivers = async()=>{
    const response = await api.get('/drivers')
    const resultData = response.data;
    console.log(response.data)
    return resultData;
}

const search = async(name) =>{
    const response = await api.get('/drivers/',{
        params:{
            name:name
        }
    })
    const resultData = response.data;
    return resultData;
}

const driversId = async (id) =>{
    const response = await api.get(`/drivers/${id}`)
    return response.data
}
const driversIdBd= async(idDB) =>{
    const response = await api.get(`/drivers/idDB/${idDB}`)
    return response.data
}
const driversAll = async (driver) => {
    try {
      if (driver.id) {
        // Intenta buscar por id
        return await driversId(driver.id);
      } else if (driver.idDB) {
        // Si no encuentra por id, busca por idDB
        return await driversIdBd(driver.idDB);
      } else {
        throw new Error('No se encontró un identificador válido para el driver');
      }
    } catch (error) {
      console.error('Error al obtener los detalles del driver', error);
      throw error;
    }
  };


const createDrivers = async(
    forename,
    surname,
    description,
    image,
    nationality,
    teams,
    dob,
)=>{
    const response = await api.post('/drivers',{
        forename,
        surname,
        description,
        image,
        nationality,
        teams,
        dob,
    })
    return response.data
}

export default{
    allDrivers,
    search,
    driversId,
    createDrivers,
    driversIdBd,
    driversAll
}