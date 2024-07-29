import axios from 'axios';
import { Driver } from '../app/db.js'; // Usa '.js' si es un módulo ES
import dotenv from 'dotenv';

dotenv.config();

const { API } = process.env;

class Driver001 {
  constructor(id, forename, surname, description, image, nationality, teams, dob) {
    this.id = id;
    this.forename = forename;
    this.surname = surname;
    this.description = description;
    this.image = image;
    this.nationality = nationality;
    this.teams = teams;
    this.dob = dob;
  }
}

const idDriversController = async (num) => {
  try {
    const { data } = await axios.get(API);
    const driverID = data.find((e) => e.id == num);

    if (driverID) {
      const {
        id,
        name: { forename, surname },
        nationality,
        dob,
        image = {},
        description = "This **driver** does not have a description available.",
        teams = "No team registration"
      } = driverID;

      const url = image.url || "https://pbs.twimg.com/profile_images/1301250347822968833/VgxlK9pY_200x200.jpg";
      const teamsArr = Array.isArray(teams) ? teams.split(',').map(e => e.trim()) : [teams];

      const soyDriverAPI = new Driver001(id, forename, surname, description, url, nationality, teamsArr, dob);
      return soyDriverAPI;
    }

    const driver = await Driver.findOne({
      where: {
        idDB: num,
      },
    });

    if (driver) {
      return driver;
    } else {
      return "No drivers associated with the entered id have been found.";
    }

  } catch (error) {
    console.error("Error:", error.message);
    return { error: "Internal Server Error" };
  }
};

export { idDriversController };
