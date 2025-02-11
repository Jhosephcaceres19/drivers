import axios from 'axios';
import { Driver } from '../app/db.js'; // Usa '.js' si es un módulo ES
import { Op } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { API } = process.env;

const postDriversController = async (forename, surname, description, image, nationality, teams, dob) => {
  try {
    // Encuentra un idDB disponible a partir de 509
    let idDB = 509;
    while (await Driver.findOne({ where: { idDB } })) {
      idDB++;
    }
    console.log(dob);

    // Realiza la búsqueda basada en forename, surname, nationality
    let existingDriverDB = await Driver.findOne({
      where: {
        [Op.and]: [
          { forename: { [Op.iLike]: `%${forename}%` } },
          { surname: { [Op.iLike]: `%${surname}%` } },
          { nationality: { [Op.iLike]: `%${nationality}%` } },
          { dob: { [Op.iLike]: `%${dob}%` } },
        ],
      },
    });

    // Si ya existe un conductor con la misma información, retorna un mensaje
    if (existingDriverDB) {
      return `Driver ${forename} ${surname} ya existe en el base de datos`;
    }

    const { data } = await axios.get(API);

    const existingDriverAPI = data.find(driver =>
      driver.name.forename.toLowerCase().includes(forename.toLowerCase()) &&
      driver.name.surname.toLowerCase().includes(surname.toLowerCase()) &&
      driver.nationality.toLowerCase().includes(nationality.toLowerCase()) && 
      driver.dob.includes(dob)
    );

    if (existingDriverAPI) {
      return `Driver ${forename} ${surname} is already in the API`;
    }

    // Crea un nuevo objeto Driver con el idDB generado y almacénalo en la base de datos
    const newDriver = await Driver.create({
      idDB,
      forename,
      surname,
      description,
      image,
      nationality,
      teams,
      dob: dob.split('T')[0],
    });

    //console.log("A new driver has been stored in the database", newDriver.toJSON());

    return {
      answer: 'Driver created successfully',
      newDriver,
    };
  } catch (error) {
    console.error('Error:', error.message);
    throw error; // Re-lanza el error para que pueda ser manejado por el middleware de error
  }
};

export { postDriversController };
