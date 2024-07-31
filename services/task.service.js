import { Tasks } from "../models/model.js";

export const registerTask = (
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

export const findTask = (id) => {
  //trovare un task passando il suo id
  return Tasks.findByPk(id);
};
export const findTasks = () => {
  //trovare tutti i tasks
  return Tasks.findAll();
};
export const updateTask = (
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

export const deleteTask = (id) => {
  //cancellare un task passando dal suo id
  return Tasks.destroy({ where: { id } });
};
