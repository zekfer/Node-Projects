const express = require("express");
const { protect } = require("../Controllers/authController");
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  searchTask,
} = require("../Controllers/taskController");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

router.route("/:id/status").patch(updateTaskStatus);

router.route("/search").get(searchTask);

module.exports = router;
