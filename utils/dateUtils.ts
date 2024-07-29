// utils/dateUtils.ts

/**
 * Formats a date string into a localized date string.
 * If no date string is provided, it returns an empty string.
 *
 * @param dateString - The date string to format (optional)
 * @returns A formatted date string or an empty string if no date was provided
 */
export const formatDueDate = (dateString?: string): string => {
  if (!dateString) return ""; // Return an empty string if no date is provided

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid date string:", dateString); // Log an error if the date is invalid
    return "Invalid Date"; // Return a placeholder for invalid dates
  }

  // You can customize the format options here
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options); // Format and return the date
};

/**
 * Checks if a date is in the past.
 *
 * @param dateString - The date string to check
 * @returns True if the date is in the past, false otherwise
 */
export const isDatePast = (dateString: string): boolean => {
  const date = new Date(dateString); // Convert the date string to a Date object
  const now = new Date(); // Get the current date and time
  return date < now; // Return true if the date is before the current date
};

/**
 * Calculates the number of days until a given date.
 *
 * @param dateString - The target date string
 * @returns The number of days until the target date, or null if the date is invalid
 */
export const daysUntil = (dateString: string): number | null => {
  const date = new Date(dateString); // Convert the date string to a Date object
  const now = new Date(); // Get the current date and time

  if (isNaN(date.getTime())) {
    console.error("Invalid date string:", dateString); // Log an error if the date is invalid
    return null; // Return null for invalid dates
  }

  const diffTime = date.getTime() - now.getTime(); // Calculate the difference in time
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert the difference to days
  return diffDays; // Return the number of days until the target date
};
