import axios from 'axios';
import { Driver } from '../app/db.js'; // Usa '.js' si es un módulo ES
import { Op } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { API } = process.env;

const nameDriversController = async (searchName) => {
  try {
    // Realiza la búsqueda basada en forename
    let existingDriverDB = await Driver.findAll({
      where: {
        forename: {
          [Op.iLike]: `%${searchName}%`,
        },
      },
      limit: 15,
    });
    if (existingDriverDB.length > 0) return existingDriverDB;

    existingDriverDB = await Driver.findAll({
      where: {
        surname: {
          [Op.iLike]: `%${searchName}%`,
        },
      },
      limit: 15,
    });

    if (existingDriverDB.length > 0) return existingDriverDB;

    const { data } = await axios.get(API);

    const existingDriverAPI = data.filter(driver =>
      driver.name.forename.toLowerCase().includes(searchName.toLowerCase()) ||
      driver.name.surname.toLowerCase().includes(searchName.toLowerCase())
    );

    const existingDriverAPIres = [];

    if (existingDriverAPI.length > 0) {
      existingDriverAPI.slice(0, 15).forEach(driver => {
        const { name: { forename, surname }, image = {}, teams } = driver;

        const url = image.url || "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png";

        const teamsArr = teams ? teams.split(',').map(e => e.trim()) : ["No team registration"];

        const driverAPI = {
          name: `${forename} ${surname}`,
          image: url,
          teams: teamsArr,
        };

        existingDriverAPIres.push(driverAPI);
      });

      if (existingDriverAPIres.length > 0) return existingDriverAPIres;
    } else {
      return `There is no match for ${searchName}, please try another forename or surname.`;
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Internal Server Error");
  }
};

export { nameDriversController };
