// context/DarkModeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create a context with an undefined default value
const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

// Provider component to wrap around parts of the app where dark mode state is needed
export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State to manage whether dark mode is enabled or not
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode on and off
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    // Provide darkMode state and toggleDarkMode function to the component tree
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use the DarkModeContext
export const useDarkMode = () => {
  // Access the context value
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    // Throw an error if useDarkMode is used outside of DarkModeProvider
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
