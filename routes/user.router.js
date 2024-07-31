import express from "express";
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
router.get("/user/:email", findUserByEmailController);
router.put("/update/:email", updateUserController);
router.delete("/delete/:email", deleteUserController);

router.post("/tasklist/register", registerTaskController);
router.get("/tasklist/tasks", findTasksController);
router.put("/tasklist/update/:id", updateTaskController);
router.delete("/tasklist/delete/:id", deleteTaskController);

export { router };
