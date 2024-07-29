// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-gray-100 dark:bg-gray-800 py-4 text-center">
    {/* Yearly copyright notice */}
    <p className="text-sm text-gray-600 dark:text-gray-400">
      &copy; {new Date().getFullYear()} Billy Coleman III. All rights reserved.
    </p>

    {/* Built with technologies notice */}
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Built with{" "}
      <a
        href="https://nextjs.org/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        Next.js
      </a>
      ,{" "}
      <a
        href="https://tailwindcss.com/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        Tailwind CSS
      </a>
      , and{" "}
      <a
        href="https://replit.com/@ItsBuddha/To-Do-List?v=1#README.md"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        Replit
      </a>
      .
    </p>
  </footer>
);

export default Footer;
