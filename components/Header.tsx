// components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 sm:py-8 px-4 sm:px-0">
      {/* Main heading for the application */}
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">
        To-Do List
      </h1>
      {/* Subheading with a brief description */}
      <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
        Manage your tasks efficiently.
      </p>
    </header>
  );
};

export default Header;
