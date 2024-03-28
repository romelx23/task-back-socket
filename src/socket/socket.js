const Task = require("../task/task.model");
// tasks

const getTasks = async () => {
  const tasks = await Task.find();
  return {
    total: tasks.length,
    tasks,
  };
};

const getTask = async (payload) => {
  const id = payload;
  const task = await Task
    .findById(id);
  return {
    task,
  };
};

const createTask = async (payload) => {
  const task = new Task(payload);
  const quantity = await Task.find().countDocuments();
  console.log(task);
  try {
    const newTask = await task.save();

    // if more than 15 tasks, stop creating

    if (quantity > 15) {
      return {
        ok: false,
        msg: "No se pueden crear más de 15 tareas",
      };
    }

    return {
      msg: "Tarea creada",
      task: newTask,
    };
  } catch (error) {
    return {
      ok: false,
      msg: "Error al crear la tarea",
    };
  }
};

const deleteTask = async (payload) => {
  const id = payload.id;
  try {
    console.log(id);
    const task = await Task.findById(id);
    console.log({ task });
    await Task.deleteOne({ _id: id });

    return {
      msg: "Tarea eliminada",
    };
  }
  catch (error) {
    return {
      msg: "Error al eliminar la tarea",
    };
  }
};

const updateTask = async (payload) => {
  const { uid, ...rest } = payload;
  console.log({ uid, rest });
  try {
    await Task.findByIdAndUpdate(uid, rest);
    return {
      msg: "Tarea actualizada",
    };
  }
  catch (error) {
    return {
      msg: "Error al actualizar la tarea",
    };
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
