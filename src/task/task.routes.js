
const { Router } = require("express");
const {
    createTask,
    getTasks,
}
    = require("../task/task.controller");

const router = Router();

router.get("/", getTasks);

router.post("/", createTask);

module.exports = router;