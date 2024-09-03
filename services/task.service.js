import { Tasks } from "../models/model.js";

const registerTask = (
  taskName,
  description,
  dueDate,
  priority,
  completed,
  userId
) => {
  //registrare un task
  return Tasks.create({
    taskName,
    description,
    dueDate,
    priority,
    completed,
    userId,
  });
};

const findTask = (id) => {
  //trovare un task passando il suo id
  return Tasks.findByPk(id);
};
const findTasks = () => {
  //trovare tutti i tasks
  return Tasks.findAll();
};
const updateTask = (
  id,
  taskName,
  description,
  dueDate,
  priority,
  completed
) => {
  //modificare  un task passando dal suo id
  return Tasks.update(
    { taskName, description, dueDate, priority, completed },
    { where: { id } }
  );
};

const deleteTask = (id) => {
  //cancellare un task passando dal suo id
  return Tasks.destroy({ where: { id } });
};
export { registerTask, findTask, findTasks, updateTask, deleteTask };
