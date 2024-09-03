import {
  loginUser,
  logoutUser,
  newAccessToken,
} from "../services/auth.service.js";

const loginUserController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email.trim() || !password.trim())
    return res.status(401).send({ message: "Email and password are required" });
  try {
    const user = await loginUser(email, password);
    return res.status(200).send({ user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "An error occurred while registering user" });
  }
};
const logoutUserController = async (req, res) => {
  const { token } = req.body; //prendere il token dal body della richiesta req.body.token
  if (!token)
    return res.status(401).send({ message: "Refresh token is required" });
  try {
    const result = await logoutUser(token); // Chiamata alla funzione logoutUser e memorizzazione del risultato
    if (result === "User logged out successfully") {
      return res.status(200).send({ message: result }); // Restituisce il messaggio di successo
    } else {
      return res.status(400).send({ message: result }); // Restituisce il messaggio di errore specifico (es. "User not found", "Token invalid")
    }
  } catch (error) {
    console.error("Logout failed:", error);
    return res.status(403).send({ message: "Invalid Refresh Token" });
  }
};

const newAccessTokenController = async (req, res) => {
  const token = req.body.refreshToken;
  if (!token)
    return res.status(401).send({ message: "Refresh token is required" });

  try {
    const accessToken = await newAccessToken(token);
    return res.status(200).send({ accessToken });
  } catch (error) {
    if (
      error.message === "User not found" ||
      error.message === "Token invalid"
    ) {
      return res.status(400).send({ message: error.message });
    }
    console.error("Error during access token request:", error);
    return res.status(403).send({ message: "Invalid Refresh Token" });
  }
};
export { loginUserController, logoutUserController, newAccessTokenController };
