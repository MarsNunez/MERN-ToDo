import mongoose from "mongoose";

const TaskScheme = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: Boolean,
});

export const TaskModel = mongoose.model("tasks", TaskScheme);
