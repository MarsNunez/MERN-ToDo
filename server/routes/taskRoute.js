import { Router } from "express";
import { TaskModel } from "../models/TaskModel.js";

const route = Router();

// Create a task
route.post("/create", async (req, res) => {
  try {
    const { title, completed } = req.body;
    const newTask = await new TaskModel({
      title,
      completed,
    });
    await newTask.save();
    res.send(newTask);
  } catch (error) {
    res.json({ error: error });
  }
});

// On click to toggle task state
route.put("/toggle", async (req, res) => {
  const { taskID } = req.body;
  const task = await TaskModel.findById(taskID);
  task.completed = !task.completed;
  await task.save();
  res.send(task);
});

// Edit task
route.put("/edit", async (req, res) => {
  const { taskID, title, completed } = req.body;
  const task = await TaskModel.findOneAndUpdate(
    { _id: taskID },
    {
      title,
      completed,
    }
  );
  await task.save();
  res.json({ message: "Task updated successfuly!" });
});

// GET single task
route.post("/edit", async (req, res) => {
  const { taskID } = req.body;
  const task = await TaskModel.findById(taskID);
  res.send(task);
});

// DELETE task
route.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTask = await TaskModel.findOneAndDelete({ _id: id });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.send(newTasks);
  } catch (error) {
    res.json({ message: error.message });
  }
});

export { route as taskRouter };
