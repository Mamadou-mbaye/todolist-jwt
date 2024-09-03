import {
  registerTask,
  findTask,
  findTasks,
  updateTask,
  deleteTask,
} from "../services/task.service.js";

const registerTaskController = async (req, res) => {
  //registare un task passando i parametri riquisti
  const taskName = req.body.taskName;
  const description = req.body.description;
  const dueDate = req.body.dueDate;
  const priority = req.body.priority;
  const completed = req.body.completed;
  const userId = req.body.userId;
  if (!taskName) {
    //verificare che i parametri sono riempiti
    return res.status(400).send({ message: "taskName is required" });
  }
  if (!priority) {
    //verificare che i parametri sono riempiti
    return res.status(400).send({ message: "priority is required" });
  }
  if (!completed) {
    //verificare che i parametri sono riempiti
    return res.status(400).send({ message: "completed is required" });
  }
  if (!userId) {
    //verificare che i parametri sono riempiti
    return res.status(400).send({ message: "userId is required" });
  }
  try {
    const task = await registerTask(
      taskName,
      description,
      dueDate,
      priority,
      completed,
      userId
    );
    return res
      .status(201)
      .send({ message: "Task registered successfully", task });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "An error occurred while registering the task" });
  }
};

const findTasksController = async (req, res) => {
  try {
    const tasks = await findTasks();
    if (tasks.length === 0)
      //verificare che ci sia almeno un task
      return res.status(400).send({ message: "No task found" });
    return res.status(201).send({ tasks });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while retrieving the tasks" });
  }
};

const updateTaskController = async (req, res) => {
  const id = Number(req.params.id);
  const taskName = req.body.taskName;
  const description = req.body.description;
  const dueDate = req.body.dueDate;
  const priority = req.body.priority;
  const completed = req.body.completed;
  try {
    const task = await findTask(id);
    if (!task) return res.status(404).send({ message: "Task not found" }); //verificare se il task esiste nel db

    const [updatedRow] = await updateTask(
      id,
      taskName,
      description,
      dueDate,
      priority,
      completed
    );
    if (updatedRow === 0) return res.status(400).send("Task not updated"); //verificare si ci sono state modifiche
    return res.status(201).send({ message: "Task updated" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while updating the task" });
  }
};

const deleteTaskController = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const task = await findTask(id);
    if (!task) return res.status(404).send({ message: "Task not found" }); //verificare se il task esiste nel db
    await deleteTask(id); //cancellare task
    return res.status(201).send({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while deleting the task" });
  }
};
export {
  registerTaskController,
  findTasksController,
  updateTaskController,
  deleteTaskController,
};
