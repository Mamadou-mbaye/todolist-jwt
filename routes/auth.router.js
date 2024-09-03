import express from "express";
import { loginUserController,logoutUserController, newAccessTokenController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutUserController);
authRouter.post("/access-token",newAccessTokenController)

export { authRouter };
