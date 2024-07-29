// components/TodoItem.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatDueDate, isDatePast, daysUntil } from "../utils/dateUtils";
import { KeyedMutator } from "swr";

interface Task {
  id: number;
  text: string;
  due_date?: string;
  completed: boolean;
}

interface TodoItemProps {
  // Task data and mutate function for updating the task list
  task: Task;
  mutate: KeyedMutator<Task[]>;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, mutate }) => {
  // Local state to manage edit mode, task text, and due date
  const [isEditing, setIsEditing] = useState(false); // Flag for edit mode
  const [text, setText] = useState(task.text); // Task text
  const [dueDate, setDueDate] = useState(task.due_date || ""); // Task due date

  // Effect to synchronize local state with props when the task changes
  useEffect(() => {
    setText(task.text);
    setDueDate(task.due_date || "");
  }, [task]);

  // Handle saving task updates
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, text, due_date: dueDate || null }),
      });
      if (response.ok) {
        setIsEditing(false); // Exit edit mode
        mutate(); // Refresh the task list
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle removing a task
  const handleRemove = async () => {
    try {
      const response = await fetch(`/api/tasks?id=${task.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        mutate(); // Refresh the task list
      } else {
        console.error("Failed to remove task");
      }
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  // Handle toggling task completion status
  const handleToggleComplete = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, completed: !task.completed }),
      });
      if (response.ok) {
        mutate(); // Refresh the task list
      } else {
        console.error("Failed to toggle task completion");
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  // Generate information about the due date
  const getDueDateInfo = () => {
    if (!task.due_date) return null;

    const formattedDate = formatDueDate(task.due_date);
    const isPast = isDatePast(task.due_date);
    const daysLeft = daysUntil(task.due_date);

    if (isPast) {
      return <span className="text-red-500">Overdue: {formattedDate}</span>;
    } else if (daysLeft !== null) {
      return (
        <span className="text-gray-500">
          Due: {formattedDate} ({daysLeft} day{daysLeft !== 1 ? "s" : ""} left)
        </span>
      );
    }

    return <span className="text-gray-500">Due: {formattedDate}</span>;
  };

  return (
    <motion.div
      className={`flex flex-col gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-md ${
        task.completed ? "bg-gray-100 dark:bg-gray-700" : ""
      }`}
      initial={{ opacity: 0, y: -10 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation state when visible
      exit={{ opacity: 0, y: 10 }} // Animation state when exiting
      transition={{ duration: 0.3 }} // Animation duration
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center flex-grow">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete} // Toggle task completion
            className="mr-4 text-blue-500 dark:text-blue-400 focus:ring-blue-600"
          />
          <div className="flex flex-col">
            {isEditing ? (
              // Display input fields for editing
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)} // Update task text
                  className="border border-gray-300 dark:border-gray-600 p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-blue-500"
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)} // Update task due date
                  className="border border-gray-300 dark:border-gray-600 p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 focus:ring-blue-500"
                    whileHover={{ scale: 1.05 }} // Animation on hover
                    whileTap={{ scale: 0.95 }} // Animation on click
                    transition={{ duration: 0.2 }} // Animation duration
                  >
                    Save
                  </motion.button>
                  <motion.button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600 focus:ring-gray-500"
                    whileHover={{ scale: 1.05 }} // Animation on hover
                    whileTap={{ scale: 0.95 }} // Animation on click
                    transition={{ duration: 0.2 }} // Animation duration
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            ) : (
              // Display task details
              <div className="flex flex-col">
                <span className="text-lg font-semibold dark:text-gray-100">
                  {task.text}
                </span>
                {getDueDateInfo()}
              </div>
            )}
          </div>
        </div>
        {!isEditing && (
          <div className="flex flex-col space-y-2">
            <motion.button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 focus:ring-green-500"
              whileHover={{ scale: 1.05 }} // Animation on hover
              whileTap={{ scale: 0.95 }} // Animation on click
              transition={{ duration: 0.2 }} // Animation duration
            >
              Edit
            </motion.button>
            <motion.button
              onClick={handleRemove}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 focus:ring-red-500"
              whileHover={{ scale: 1.05 }} // Animation on hover
              whileTap={{ scale: 0.95 }} // Animation on click
              transition={{ duration: 0.2 }} // Animation duration
            >
              Remove
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem;
