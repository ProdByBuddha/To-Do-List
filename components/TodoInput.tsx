// components/TodoInput.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

interface TodoInputProps {
  // Callback function to handle adding a new task
  onAddTask: (text: string, dueDate?: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTask }) => {
  // Local state to manage input values and error messages
  const [text, setText] = useState(""); // Task text
  const [dueDate, setDueDate] = useState(""); // Task due date
  const [error, setError] = useState(""); // Error message

  // Handles form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!text.trim()) {
      setError("Task text is required."); // Set error if task text is empty
      return;
    }
    setError(""); // Clear error if validation passes
    onAddTask(text, dueDate); // Call the parent function to add the task
    setText(""); // Clear input fields after submission
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
      <div>
        <label
          htmlFor="task"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Task
        </label>
        <input
          id="task"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)} // Update state on input change
          placeholder="Add a new task"
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}{" "}
        {/* Display error message */}
      </div>
      <div>
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} // Update state on input change
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
        >
          Add Task
        </button>
      </motion.div>
    </form>
  );
};

export default TodoInput;
