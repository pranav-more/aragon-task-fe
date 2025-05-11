"use client";

import Task from "./Task";

const Column = ({ column, onTaskClick }) => {
  return (
    <div className="min-w-[280px] max-w-[280px] flex flex-col">
      <div className="mb-6 flex items-center">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${getColumnColor(column.name)}`}
        />
        <h3 className="uppercase font-bold text-sm tracking-wider text-gray-500">
          {column.name} ({column.tasks.length})
        </h3>
      </div>

      <div className="flex-1 space-y-4 scrollbar-hide">
        {column.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task, column.id)}
          />
        ))}

        {column.tasks.length === 0 && (
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md p-4 h-24 flex items-center justify-center">
            <p className="text-gray-400 text-sm">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to determine column color based on name
const getColumnColor = (name) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("todo")) {
    return "bg-cyan-500";
  } else if (lowerName.includes("doing")) {
    return "bg-purple-500";
  } else if (lowerName.includes("done")) {
    return "bg-green-500";
  } else {
    return "bg-gray-500";
  }
};

export default Column;
