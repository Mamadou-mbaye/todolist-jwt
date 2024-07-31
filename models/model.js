import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

//variabili d'ambiemte
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_user = process.env.DB_USER;
const db_name = process.env.DB_NAME;
const db_password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(db_name, db_user, db_password, {
  // definire la connessione con il database
  host: db_host,
  dialect: "mysql",
  port: db_port,
  // logging: (...msg) => console.log(msg), // Displays all log function call parameters
});

// creare un model nel db
export const Users = sequelize.define("users", {
  //i campi con alloNull: false, sono essenziali mentre quelli con allowNull: true sono opzionali
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  birthDate:{ type: DataTypes.DATE, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  refreshToken: { type: DataTypes.STRING, allowNull: true },
});

export const Tasks = sequelize.define("tasks", {
  taskName: { type: DataTypes.STRING, allowNull: false }, // Nome del compito è essenziale
  description: { type: DataTypes.STRING, allowNull: true }, // Descrizione è opzionale
  dueDate: { type: DataTypes.DATE, allowNull: true }, // Data di scadenza è opzionale
  priority: { type: DataTypes.ENUM("low", "medium", "high"), allowNull: false }, // Priorità è essenziale
  completed: { type: DataTypes.BOOLEAN, allowNull: false }, // Stato di completamento è essenziale
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

//difinire la relazione tra i models Users e Tasks
Users.hasMany(Tasks);
Tasks.belongsTo(Users);

export const connect = async () => {
  try {
    await sequelize.authenticate(); //provare a stabilire la connessione con il db
    await sequelize.sync(); // sincronnizare i modelli creati con il database
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
