import express, { json } from "express";
import { taskRouter } from "./routes/taskRoute.js";
import cors from "cors";
import mongoose from "mongoose";
import { TaskModel } from "./models/TaskModel.js";

const app = express();

app.use(
  cors({
    origin: "https://mern-to-do-omega.vercel.app", // Solo permite solicitudes desde este origen
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Permite incluir cookies en las solicitudes (si es necesario)
  })
);
app.use(express.json());
app.use(taskRouter);

app.get("/", async (req, res) => {
  // const tasks = await TaskModel.find({});
  // res.json(tasks);
  res.send("Hello dog!");
});

mongoose
  .connect(
    "mongodb+srv://root:root@tasks.1xlf5da.mongodb.net/tasks?retryWrites=true&w=majority"
  )
  .then(
    app.listen(3001, () => {
      console.log("Listening on port 3001");
    })
  );
