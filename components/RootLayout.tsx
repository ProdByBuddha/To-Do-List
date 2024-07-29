// components/RootLayout.tsx
import { useDarkMode } from "../contexts/DarkModeContext";
import { useEffect } from "react";

const RootLayout: React.FC = ({ children }) => {
  // Retrieve dark mode status from context
  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Toggle the 'dark' class on the root element based on darkMode state
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]); // Dependency array: useEffect runs whenever darkMode changes

  // Render children components inside the layout
  return <>{children}</>;
};

export default RootLayout;
