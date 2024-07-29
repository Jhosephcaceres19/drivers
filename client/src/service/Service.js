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
    createDrivers
}