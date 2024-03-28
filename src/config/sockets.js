const {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("../socket/socket");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connect", async (socket) => {
      console.log("cliente conectado");
      // Escuchar cuando el cliente cree una tarea

      socket.on("create-task", async (task) => {
        console.log("create-task", task);
        await createTask(task);
        this.io.emit("get-tasks", await getTasks());
      });

      socket.on("delete-task", async (payload) => {
        console.log("delete-task", payload);
        await deleteTask(payload);
        this.io.emit("get-tasks", await getTasks());
      });

      socket.on("update-task", async (payload) => {
        console.log("update-task");
        await updateTask(payload);
        this.io.emit("get-tasks", await getTasks());
      });

      socket.on("get-tasks", async () => {
        socket.emit("get-tasks", await getTasks());
      });
    });
    // On disconnection
    this.io.on("disconnect", () => {
      console.log("cliente desconectado");
    });
  }
}

module.exports = Sockets;
