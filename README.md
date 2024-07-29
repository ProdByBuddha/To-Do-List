# Next.js To-Do List App

This is a feature-rich To-Do List application built with Next.js and styled with Tailwind CSS. It provides a clean, intuitive interface for managing daily tasks, with robust backend persistence, dark mode support, and smooth animations.

## Features

- Add new tasks with optional due dates
- Edit existing tasks (text and due date)
- Mark tasks as completed
- Remove individual tasks
- Remove all completed tasks at once
- Automatic sorting of tasks based on due dates
- Visual indicators for overdue tasks and tasks due soon
- Responsive design that works on both desktop and mobile devices
- Dark mode support with easy toggle
- Smooth animations for enhanced user experience
- PostgreSQL database for persistent storage

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [SWR](https://swr.vercel.app/) - React Hooks library for data fetching
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [PostgreSQL](https://www.postgresql.org/) - Open source relational database
- [node-postgres](https://node-postgres.com/) - PostgreSQL client for Node.js
- [React Context](https://reactjs.org/docs/context.html) - For managing application-wide state (dark mode)
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React

## Getting Started

To run this project locally:

1. Clone the repository to your local machine
2. Navigate to the project directory
3. Install the dependencies:
   ```
   npm install
   ```
4. Set up your PostgreSQL database and add the connection string to your environment variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   ```
5. Run the development server:
   ```
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

- `pages/`:
  - `index.tsx`: The main page of the application
  - `api/tasks.ts`: API route handler for task-related operations
- `components/`:
  - `DarkModeToggle.tsx`: Toggle button for dark mode
  - `Footer.tsx`: Footer component with copyright and technology information
  - `Header.tsx`: Header component with application title
  - `Navbar.tsx`: Navigation bar component
  - `RootLayout.tsx`: Root layout component managing dark mode application
  - `TodoInput.tsx`: Component for adding new tasks
  - `TodoItem.tsx`: Component for rendering individual task items
  - `TodoList.tsx`: Component for rendering the list of tasks
- `contexts/`:
  - `DarkModeContext.tsx`: Context for managing dark mode state
- `lib/`:
  - `tasks.ts`: Contains functions for task database operations
  - `db.ts`: Database connection and query function
- `utils/`:
  - `dateUtils.ts`: Utility functions for date formatting and calculations

## Key Components

### TodoItem

- Renders individual task items
- Allows editing of task text and due date
- Provides options to mark tasks as complete or remove them
- Displays due date information with color-coding for overdue tasks
- Uses Framer Motion for smooth animations

### TodoInput

- Provides a form for adding new tasks
- Includes input fields for task text and due date
- Performs basic validation before submitting

### TodoList

- Renders the list of TodoItem components
- Handles cases where no tasks are available

### RootLayout

- Manages the application of dark mode to the entire application
- Wraps around the main application content

## Dark Mode

The application includes a dark mode feature for improved user experience:

- Implemented using React Context for global state management
- `DarkModeContext.tsx` provides the dark mode state and toggle function
- `DarkModeToggle` component allows users to switch between light and dark modes
- `RootLayout` component applies the dark mode class to the root HTML element
- Tailwind CSS classes are used to style components based on the current mode (e.g., `dark:bg-gray-800`)

## Database Operations

The `lib/tasks.ts` file contains functions for task database operations, including:

- Fetching all tasks
- Creating new tasks
- Updating existing tasks
- Deleting tasks
- Updating task completion status
- Deleting all completed tasks

## API Routes

The application uses a single API route (`/api/tasks`) that handles different HTTP methods for various task operations.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE.md).