const { DataTypes } = require("sequelize"); // Corrección del nombre DataTypes

module.exports = (sequelize) => {

    sequelize.define("Drivers", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.JSON, // Usa JSON para almacenar un objeto anidado
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.JSON, // Usa JSON para almacenar un objeto anidado
            allowNull: false,
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.STRING,
        },
    });
};
