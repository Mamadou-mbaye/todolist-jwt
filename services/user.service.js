import { Users } from "../models/model.js";
/* firstName,
    lastName,
    birthDate,
    email,
    password,
    refreshToken,
  */

// Funzione per creare un nuovo utente
export const registerUser = (
  firstName,
  lastName,
  birthDate,
  email,
  password
) => {
  return Users.create({ firstName, lastName, birthDate, email, password });
};

// Funzione per trovare un utente tramite email
export const findUserByEmail = (email) => {
  return Users.findOne({ where: { email } });
};
export const updateUser = (firstName, lastName, birthDate, email,password) => {
  return Users.update(
    { firstName, lastName, birthDate, password },
    { where: { email } }
  );
};
export const deleteUser = (email)=>{
  return Users.destroy({where:{email}})
}