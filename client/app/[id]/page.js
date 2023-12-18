"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const getTask = async () => {
      // const task = await axios.post("http://localhost:3001/edit", {
      const task = await axios.post(
        "https://mern-to-do-omega.vercel.app/edit",
        {
          taskID: params.id,
        }
      );
      console.log(task);
      setTitle(task.data.title);
      setCompleted(task.data.completed);
    };
    console.log(getTask());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios.put("http://localhost:3001/edit", {
    await axios.put("https://mern-to-do-omega.vercel.app/edit", {
      taskID: params.id,
      title,
      completed,
    });
    router.push("/");
  };

  return (
    <main className="max-w-2xl mx-auto p-10">
      <h1 className="text-center text-3xl font-bold mb-10">Edit task 🐧</h1>
      <form className="mt-5 gap-5 mb-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="Add a new task"
            className="border-2 border-black rounded-md w-full px-3 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div
            className={`border rounded-lg px-5 py-2 cursor-pointer ${
              completed ? "bg-blue-600" : "bg-red-600"
            } text-white`}
            onClick={() => setCompleted(!completed)}
          >
            {completed ? "Done" : "Todo"}
          </div>
        </div>
        <button
          type="submit"
          className="text-white mt-4 bg-gradient-to-r w-40 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Save changes
        </button>
      </form>
      <Link href={"/"}>👈 Get back</Link>
    </main>
  );
};

export default EditTask;
