// lib/db.ts
import { Pool } from "pg";

let pool: Pool;

// Check if code is running on the server side
if (typeof window === "undefined") {
  // Server-side code

  // Retrieve the database connection string from environment variables
  const connectionString = process.env.DATABASE_URL;

  // Throw an error if the DATABASE_URL environment variable is not set
  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
  }

  // Initialize a new Pool instance with the connection string
  pool = new Pool({
    connectionString,
  });
} else {
  // Client-side code
  // Throw an error if this module is imported on the client side, as database access is not allowed on the client side
  throw new Error("lib/db should not be imported on the client side");
}

// Function to execute SQL queries
export const query = (text: string, params?: any[]) => {
  // Use the pool to execute the query with the given SQL text and parameters
  return pool.query(text, params);
};
