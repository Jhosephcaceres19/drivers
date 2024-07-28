import axios from 'axios';
import { Driver } from '../app/db.js'; // Usa '.js' si es un módulo ES
import dotenv from 'dotenv';

dotenv.config();

const { API } = process.env;

class Driver001 {
  constructor(idDB, forename, surname, description, image, nationality, teams, dob) {
    this.idDB = idDB;
    this.forename = forename;
    this.surname = surname;
    this.description = description;
    this.image = image;
    this.nationality = nationality;
    this.teams = teams;
    this.dob = dob;
  }
}

const functControllerGen = async () => {
  let tableDrivers = await Driver.findAll();

  if (tableDrivers.length > 0) {
    return tableDrivers;
  }

  const { data } = await axios.get(API);

  const driversArray = data.map(obj => {
    const {
      id,
      name: { forename, surname },
      nationality,
      dob,
      image = {},
      description = "This **driver** does not have a description available.",
      teams = "No team registration"
    } = obj;

    const url = image.url || "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png";
    const teamsArr = Array.isArray(teams) ? teams.split(',').map(e => e.trim()) : [teams];

    return new Driver001(id, forename, surname, description, url, nationality, teamsArr, dob);
  });

  // Almacenar información en la tabla Drivers
  await Driver.bulkCreate(driversArray);

  tableDrivers = await Driver.findAll();
  return tableDrivers;
};

export { functControllerGen };
