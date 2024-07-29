// components/TodoList.tsx
import React from "react";
import TodoItem from "./TodoItem";
import { KeyedMutator } from "swr";

interface Task {
  id: number;
  text: string;
  due_date?: string;
  completed: boolean;
}

interface TodoListProps {
  // List of tasks and function to mutate (refresh) the task data
  tasks: Task[];
  mutate: KeyedMutator<Task[]>;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, mutate }) => {
  return (
    <div className="task-list space-y-4 dark:bg-gray-900 p-4 rounded-lg">
      {/* Conditional rendering: Check if there are no tasks */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No tasks available.
        </p>
      ) : (
        // Render a list of TodoItem components for each task
        tasks.map((task) => (
          <TodoItem
            key={task.id} // Unique key for each TodoItem
            task={task}
            mutate={mutate}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
