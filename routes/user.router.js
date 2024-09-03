import express from "express";
import { authenticateJWT } from "../middleware/authtenticate.js";
import {
  registerUserController,
  findUserByEmailController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";
import {
  registerTaskController,
  findTasksController,
  updateTaskController,
  deleteTaskController,
} from "./../controllers/task.controller.js";

//definire il router per le richieste
const router = express.Router();

router.post("/register", registerUserController);
router.get("/user/:email", authenticateJWT ,findUserByEmailController);
router.put("/update/:email",  authenticateJWT,updateUserController);
router.delete("/delete/:email",  authenticateJWT,deleteUserController);

router.post("/tasklist/register",  authenticateJWT,registerTaskController);
router.get("/tasklist/tasks", authenticateJWT, findTasksController);
router.put("/tasklist/update/:id",  authenticateJWT,updateTaskController);
router.delete("/tasklist/delete/:id",  authenticateJWT,deleteTaskController);

export { router };
