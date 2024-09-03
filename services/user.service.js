import { Users } from "../models/model.js";
import bcrypt from "bcrypt";

const salt = 10;
// Funzione per creare un nuovo utente
const registerUser = async (
  firstName,
  lastName,
  birthDate,
  email,
  password
) => {
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await Users.create({
    firstName,
    lastName,
    birthDate,
    email,
    password: hashedPassword,
  });
  return newUser;
};

// Funzione per trovare un utente tramite email
const findUserByEmail = (email) => {
  return Users.findOne({ where: { email } });
};
const updateUser = (firstName, lastName, birthDate, email, password) => {
  return Users.update(
    { firstName, lastName, birthDate, password },
    { where: { email } }
  );
};
const deleteUser = (email) => {
  return Users.destroy({ where: { email } });
};

export { registerUser, findUserByEmail, updateUser, deleteUser };
