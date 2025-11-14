const Task = require("../Models/taskModel");
const catchAsync = require("../Utils/catchAsync");
const factory = require("./handlerFactory");

exports.searchTask = async (req, res) => {
  const { query } = req.query;
  try {
    const tasks = await Task.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createTask = factory.createOne(Task);
exports.getAllTasks = factory.getAll(Task);
exports.getTask = factory.getOne(Task);
exports.updateTask = factory.updateOne(Task);
exports.deleteTask = factory.deleteOne(Task);
