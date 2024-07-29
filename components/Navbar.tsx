// components/Navbar.tsx
import DarkModeToggle from "./DarkModeToggle";

const Navbar: React.FC = () => (
  <nav className="p-4 bg-gray-100 dark:bg-gray-800">
    <div className="container mx-auto flex items-center justify-between">
      {/* Brand or title of the application */}
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Next.js Projects
      </h1>
      {/* Dark mode toggle button */}
      <DarkModeToggle />
    </div>
  </nav>
);

export default Navbar;
