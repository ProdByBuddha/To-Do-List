// pages/index.tsx
import { NextPage } from "next";
import useSWR from "swr";
import { useMemo } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

interface Task {
  id: number;
  text: string;
  due_date?: string;
  completed: boolean;
}

// Function to fetch data from a given URL
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

const Home: NextPage = () => {
  // Fetch tasks from the API using SWR for data fetching and caching
  const { data: tasks, error, mutate } = useSWR<Task[]>("/api/tasks", fetcher);

  // Function to add a new task
  const addTask = async (text: string, dueDate?: string) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, dueDate }),
      });
      if (response.ok) {
        // Revalidate the tasks data
        mutate();
      } else {
        const errorData = await response.json();
        console.error(
          `Failed to add task: ${errorData.error || response.statusText}`,
        );
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to remove all completed tasks
  const removeAllCompleted = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "DELETE",
      });
      if (response.ok) {
        // Revalidate the tasks data
        mutate();
      } else {
        const errorData = await response.json();
        console.error(
          `Failed to remove all completed tasks: ${errorData.error || response.statusText}`,
        );
      }
    } catch (error) {
      console.error("Error removing all completed tasks:", error);
    }
  };

  // Sort and filter tasks based on due date
  const sortedAndFilteredTasks = useMemo(() => {
    if (!tasks) return [];
    return [...tasks].sort((a, b) => {
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });
  }, [tasks]);

  // Handle loading and error states
  if (error)
    return (
      <div className="text-center text-red-500 p-4">Failed to load tasks</div>
    );
  if (!tasks) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Head>
        <title>Next.js To-Do List</title>
        <meta
          name="description"
          content="A simple to-do list built with Next.js and Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Render the navigation bar */}
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Render the page header */}
        <Header />
        {/* Render the input form for adding new tasks */}
        <TodoInput onAddTask={addTask} />
        {/* Conditionally render button to remove all completed tasks */}
        {sortedAndFilteredTasks.some((task) => task.completed) && (
          <motion.button
            onClick={removeAllCompleted}
            className="w-full mb-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Remove All Completed
          </motion.button>
        )}
        {/* Render the list of tasks */}
        <TodoList tasks={sortedAndFilteredTasks} mutate={mutate} />
      </main>
      {/* Render the footer */}
      <Footer />
    </div>
  );
};

export default Home;
