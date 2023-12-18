"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      // const tasks = await axios("http://localhost:3001/");
      const tasks = await axios("https://www.mern-to-do-omega.vercel.app/");
      setTasks(tasks.data);
    };
    getTasks();
  }, [tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios.post("http://localhost:3001/create", {
    await axios.post("https://www.mern-to-do-omega.vercel.app/create", {
      title,
      completed: false,
    });
  };

  return (
    <main className="max-w-2xl mx-auto p-10">
      <h1 className="text-center text-3xl font-bold mb-10">TODO Tasks ✅</h1>
      <div className="mb-5">
        {tasks.map((task) => (
          <div className="flex justify-between items-center" key={task._id}>
            <h2>
              • {task.title}
              {task.completed ? (
                <span
                  onClick={async () => {
                    // await axios.put("http://localhost:3001/toggle", {
                    await axios.put(
                      "https://www.mern-to-do-omega.vercel.app/toggle",
                      {
                        taskID: task._id,
                      }
                    );
                  }}
                  className="cursor-pointer border bg-blue-600 text-white rounded-md ml-3 px-2 font-light text-sm"
                >
                  Done
                </span>
              ) : (
                <span
                  onClick={async () => {
                    // await axios.put("http://localhost:3001/toggle", {
                    await axios.put(
                      "https://www.mern-to-do-omega.vercel.app/toggle",
                      {
                        taskID: task._id,
                      }
                    );
                  }}
                  className="cursor-pointer border bg-red-600 text-white rounded-md ml-3 px-2 font-light text-sm"
                >
                  Todo
                </span>
              )}
            </h2>
            <div>
              <Link
                href={"/" + task._id}
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={async () => {
                  await axios.delete(
                    // "http://localhost:3001/delete/" + task._id
                    "https://www.mern-to-do-omega.vercel.app/delete/" + task._id
                  );
                }}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <form
        className="flex mt-5 gap-5 items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Add a new task"
          className="border-2 border-black rounded-md w-full px-3 py-1"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button
          type="submit"
          className="text-white bg-gradient-to-r w-40 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Ok lets go
        </button>
      </form>
    </main>
  );
}
