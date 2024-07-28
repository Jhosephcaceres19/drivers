import axios from 'axios';
import { Driver } from '../app/db.js'; // Asegúrate de que el archivo tenga la extensión '.js'
import dotenv from 'dotenv';

dotenv.config();

const { API } = process.env;

const driversController = async () => {
  try {
    const { data } = await axios.get(API);

    const driversArray = [];

    data.forEach((obj) => {
      try {
        const {
          id,
          name: { forename, surname },
          dob,
        } = obj;

        const url = obj.image?.url || "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png";

        const teamsArr = obj.teams ? obj.teams.split(',').map((e) => e.trim()) : ["No team registration"];

        const driverAPI = {
          id,
          name: `${forename} ${surname}`,
          image: url,
          teams: teamsArr,
          dob,
        };

        driversArray.push(driverAPI);
      } catch (innerError) {
        console.error("Error processing API data:", innerError.message);
      }
    });

    const tableDrivers = await Driver.findAll();

    if (tableDrivers.length > 0) {
      tableDrivers.forEach((e) => {
        const { idDB, forename, surname, image, teams, dob } = e;

        const driverDB = {
          idDB,
          name: `${forename} ${surname}`,
          image,
          teams,
          dob,
        };

        driversArray.push(driverDB);
      });
    }

    return driversArray;
  } catch (error) {
    console.error("Error fetching data from the API:", error.message);
    return [];
  }
};

export { driversController };
