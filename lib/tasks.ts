// lib/tasks.ts
import { query } from './db';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Fetch all tasks from the database
export async function getTasks() {
  try {
    const result = await query(`
      SELECT id, text, due_date, completed
      FROM tasks
      ORDER BY id ASC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching tasks:', error.stack || error);
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
}

// Create a new task in the database
export async function createTask(text: string, dueDate?: string) {
  try {
    const utcDueDate = dueDate ? new Date(dueDate).toISOString() : null;
    const result = await query(
      `INSERT INTO tasks (text, due_date)
       VALUES ($1, $2)
       RETURNING id, text, due_date, completed`,
      [text, utcDueDate]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating task:', error.stack || error);
    throw new Error(`Failed to create task: ${error.message}`);
  }
}

// Update an existing task's text and due date
export async function updateTask(id: number, text: string, dueDate?: string) {
  try {
    const utcDueDate = dueDate ? new Date(dueDate).toISOString() : null;
    const result = await query(
      `UPDATE tasks
       SET text = $1, due_date = $2
       WHERE id = $3
       RETURNING id, text, due_date, completed`,
      [text, utcDueDate, id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error updating task:', error.stack || error);
    throw new Error(`Failed to update task: ${error.message}`);
  }
}

// Delete a task by its ID
export async function deleteTask(id: number) {
  try {
    const result = await query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error deleting task:', error.stack || error);
    throw new Error(`Failed to delete task: ${error.message}`);
  }
}

// Update the completion status of a task
export async function updateTaskCompletion(id: number, completed: boolean) {
  try {
    const result = await query(
      `UPDATE tasks
       SET completed = $1
       WHERE id = $2
       RETURNING id, text, due_date, completed`,
      [completed, id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error updating task completion:', error.stack || error);
    throw new Error(`Failed to update task completion: ${error.message}`);
  }
}

// Delete all completed tasks from the database
export async function deleteAllCompletedTasks() {
  try {
    const result = await query(
      'DELETE FROM tasks WHERE completed = TRUE RETURNING *'
    );
    return result.rows;
  } catch (error) {
    console.error('Error deleting all completed tasks:', error.stack || error);
    throw new Error(`Failed to delete all completed tasks: ${error.message}`);
  }
}

// Fetch and update the LICENSE.md file from the MIT license generator
export async function updateLicenseFile() {
  const licenseUrl = 'https://mit-license-generator.replit.app/license';
  const filePath = path.join(process.cwd(), 'LICENSE.md');

  try {
    const response = await fetch(licenseUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch license: ${response.statusText}`);
    }
    const licenseText = await response.text();

    fs.writeFileSync(filePath, licenseText, 'utf8');
    console.log('LICENSE.md updated successfully');
  } catch (error) {
    console.error('Error updating LICENSE.md:', error.stack || error);
    throw new Error(`Failed to update LICENSE.md: ${error.message}`);
  }
}

// Clear all tasks from the database
export async function clearAllTasks() {
  try {
    const result = await query(
      'DELETE FROM tasks RETURNING *'
    );
    return result.rows;
  } catch (error) {
    console.error('Error clearing all tasks:', error.stack || error);
    throw new Error(`Failed to clear all tasks: ${error.message}`);
  }
}

// Function to start the task scheduler for updating the LICENSE.md file and clearing tasks
export function startTaskSchedulers() {
  // Update LICENSE.md immediately
  updateLicenseFile();

  // Schedule to run every 24 hours (86400000 milliseconds)
  setInterval(async () => {
    try {
      await updateLicenseFile();
    } catch (error) {
      console.error('Scheduled license update error:', error.stack || error);
    }
  }, 86400000); // 24 hours in milliseconds

  // Clear all tasks immediately
  clearAllTasks();

  // Schedule to run every hour (3600000 milliseconds)
  setInterval(async () => {
    try {
      await clearAllTasks();
    } catch (error) {
      console.error('Scheduled task clearing error:', error.stack || error);
    }
  }, 3600000); // 1 hour in milliseconds
}

// Call this function at the start of your application to begin the scheduler
startTaskSchedulers();
