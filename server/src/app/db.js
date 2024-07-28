import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import defineDriverModel from '../models/Drivers.js'; // Usa '.js' si es un módulo ES
import defineTeamModel from '../models/Teams.js';     // Usa '.js' si es un módulo ES

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: console.log('Connected to DB...'),
  native: false,
});

// Definición de modelos
defineDriverModel(sequelize);
defineTeamModel(sequelize);

// Relaciones
const { Driver, Team } = sequelize.models;

Driver.belongsToMany(Team, { through: 'driver_team' });
Team.belongsToMany(Driver, { through: 'driver_team' });

// Exportar los modelos y la conexión
export {
  Driver,
  Team,
  sequelize as conn
};
