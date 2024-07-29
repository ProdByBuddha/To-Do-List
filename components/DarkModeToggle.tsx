// components/DarkModeToggle.tsx
import { useDarkMode } from "../contexts/DarkModeContext";

const DarkModeToggle: React.FC = () => {
  // Destructure the darkMode state and toggleDarkMode function from the DarkModeContext
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
      aria-label="Toggle Dark Mode"
    >
      {/* Display the appropriate icon based on the current dark mode state */}
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default DarkModeToggle;
