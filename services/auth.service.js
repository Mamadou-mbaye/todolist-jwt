import { Users } from "../models/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const accessTokenexpired = "1m";
const refreshTokenexpired = "15m";

const loginUser = async (email, password) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) return "Invalid email"; //verificare la validita della mail

  const isPasswordValid = await bcrypt.compare(password, user.password); //mettere in confronto la password passata durante il login con quello dello user
  if (!isPasswordValid) return "Password incorrect"; //verificare la validita della password

  // Crea i dati utente che vuoi restituire
  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: user.birthDate,
    email: user.email,
  };

  // Genera l'access token
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    ACCESS_TOKEN,
    { expiresIn: accessTokenexpired }
  );

  // Genera il refresh token
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    REFRESH_TOKEN,
    { expiresIn: refreshTokenexpired }
  );

  // Salva il refresh token nella colonna 'refreshToken' del database
  await Users.update({ refreshToken }, { where: { id: user.id } });

  // Ritorna i dati dell'utente
  return { ...userData, accessToken, refreshToken };

  //   return userData;//ritornare i dati che vogliamo passare durante login
};

const logoutUser = async (token) => {
  try {
    // Verifica e decodifica il token
    const decoded = jwt.verify(token, REFRESH_TOKEN);
    // Trova l'utente corrispondente usando l'ID decodificato dal token
    const user = await Users.findOne({ where: { id: decoded.id } });
    if (!user) return "User not found";
    // Verifica che il token corrisponda al refresh token memorizzato nell'utente
    if (user.refreshToken !== token) return "Token invalid";
    // Resetta il refresh token dell'utente
    await Users.update({ refreshToken: null }, { where: { id: user.id } });
    return "User logged out successfully";
  } catch (error) {
    console.error("Error during logout:", error.message);
    return "Logout failed";
  }
};

const newAccessToken = async (token) => {
  try {
    //in caso accessToken non è piu valido, mandare il refresh token per avere un nuovo accessToken
    const decoded = jwt.verify(token, REFRESH_TOKEN);

    //trovare l'utente con id decodificato dal refreshToken
    const user = await Users.findOne({ where: { id: decoded.id } });
    if (!user) throw new Error("User not found");

    //verificare se il refreshToken passato è valido
    if (user.refreshToken !== token) throw new Error("Token invalid");

    //creare un nuovo accessToken
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      ACCESS_TOKEN,
      { expiresIn: accessTokenexpired }
    );

    //ritornare il nuovo access token
    return accessToken;
  } catch (error) {
    console.error("Error during access token request:", error.message);
    throw error;
  }
};
export { loginUser, newAccessToken, logoutUser };
