import { DataTypes } from "sequelize";
import { sequelize } from '../../database';
export const Jornada = sequelize.define(
  "jornada",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    codigoEmpleado: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    horaEntrada: {
      type: DataTypes.DATE,
    },

    horaSalida: {
      type: DataTypes.DATE,
    },

    tiempoTotal: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "jornadas",
  }
);