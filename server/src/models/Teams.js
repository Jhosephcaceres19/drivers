import { DataTypes } from "sequelize"; // Importa DataTypes

export default (sequelize) => {
  return sequelize.define("Teams", {
    // Usa 'return' para devolver el modelo
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
