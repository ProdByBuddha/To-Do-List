// pages/api/tasks.ts
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskCompletion,
  updateTask,
  deleteAllCompletedTasks,
} from "../../lib/tasks";

// API handler function to manage task-related requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case "GET":
        // Handle GET request to fetch all tasks
        const tasks = await getTasks();
        res.status(200).json(tasks);
        break;

      case "POST": {
        // Handle POST request to create a new task
        const { text: newText, dueDate } = req.body;
        if (!newText) {
          // Respond with an error if task text is missing
          res.status(400).json({ error: "Task text is required" });
          return;
        }
        const newTask = await createTask(newText, dueDate || null);
        res.status(201).json(newTask);
        break;
      }

      case "DELETE":
        // Handle DELETE request to remove tasks
        if (req.query.id) {
          // Delete a specific task by ID
          const id = parseInt(req.query.id as string, 10);
          if (isNaN(id)) {
            // Respond with an error if the ID is invalid
            res.status(400).json({ error: "Invalid task ID" });
            return;
          }
          const deletedTask = await deleteTask(id);
          if (!deletedTask) {
            // Respond with an error if the task is not found
            res.status(404).json({ error: "Task not found" });
            return;
          }
          res.status(200).json(deletedTask);
        } else {
          // Delete all completed tasks
          const deletedTasks = await deleteAllCompletedTasks();
          res.status(200).json({
            message: "All completed tasks removed",
            count: deletedTasks.length,
          });
        }
        break;

      case "PATCH": {
        // Handle PATCH request to update a task
        const {
          id,
          completed,
          text: updateText,
          due_date: updateDueDate,
        } = req.body;
        if (typeof id !== "number") {
          // Respond with an error if the ID is not a number
          res.status(400).json({ error: "Invalid request data" });
          return;
        }
        if (updateText !== undefined || updateDueDate !== undefined) {
          // Update task details (text or due date)
          const updatedTask = await updateTask(id, updateText, updateDueDate);
          if (!updatedTask) {
            // Respond with an error if the task is not found
            res.status(404).json({ error: "Task not found" });
            return;
          }
          res.status(200).json(updatedTask);
        } else if (typeof completed === "boolean") {
          // Update task completion status
          const updatedTask = await updateTaskCompletion(id, completed);
          if (!updatedTask) {
            // Respond with an error if the task is not found
            res.status(404).json({ error: "Task not found" });
            return;
          }
          res.status(200).json(updatedTask);
        } else {
          // Respond with an error if the request data is invalid
          res.status(400).json({ error: "Invalid request data" });
        }
        break;
      }

      default:
        // Handle unsupported HTTP methods
        res.setHeader("Allow", ["GET", "POST", "DELETE", "PATCH"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Log and handle internal server errors
    console.error("API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
