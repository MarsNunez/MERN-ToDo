"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await axios("https://mern-to-do-omega.vercel.app/");
      setTasks(tasks.data.message);
    };
    getTasks();
  }, [tasks]);

  return (
    <main>
      <h1>{tasks} ⚡️</h1>
    </main>
  );
}
