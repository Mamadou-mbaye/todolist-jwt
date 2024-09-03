import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Users } from "../models/model.js";
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
//autentificare user prima delle richieste
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    //verificare la non presenza di un header
    console.log("Authorization header missing");
    return res.status(401).send({ message: "Access Denied" });
  }
  // Supponendo il formato "Bearer TOKEN" e prendere Token
  const token = authHeader.split(" ")[1];
  if (!token) {
    //rifiutare la richiesta in caso non ci sia un token
    console.log("Token missing");
    return res.status(401).send({ message: "Access Denied token required" });
  }
  try {
    //verificare se il token è valido mettendolo in confronto con accessToken
    const verified = jwt.verify(token, ACCESS_TOKEN);

    // Trova l'utente nel database usando l'ID decodificato dall'access token
    const user = await Users.findOne({ where: { id: verified.id } });
    if (!user) {
      return res.status(401).send({ message: "Invalid Token" });
    }
    // Verifica che il refresh token non sia stato revocato
    if (!user.refreshToken) {
      console.error("Refresh token has been revoked. Re-login required.");
      return res
        .status(401)
        .send({ message: "Session expired. Please login again." });
    }
    req.user = verified;
    next();
  } catch (error) {
    console.log("Token verification failed:", error);
    res.status(400).send({ message: "Invalid Token" });
  }
};

export { authenticateJWT };
