// componenets/RootLayout.tsx
import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  // Retrieve dark mode status from context
  const { darkMode } = useDarkMode();

  return <div className={darkMode ? "dark" : ""}>{children}</div>;
};

export default RootLayout;
