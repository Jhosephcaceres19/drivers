require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { default: Teams } = require("../models/Teams");
const Drivers = require("../models/Drivers");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);


//ejecutar los modelos
Drivers(sequelize)
Teams(sequelize)

// Definir la relación muchos-a-muchos
const {dirvers, teams} = sequelize.models;
Drivers.belongsToMany(Teams, { through: 'DriverTeams' });
Teams.belongsToMany(Drivers, { through: 'DriverTeams' });

module.exports = {
    ...sequelize.models,
    conn: sequelize,
  };