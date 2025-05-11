"use client";

import Task from "./Task";

const Column = ({ column, onTaskClick }) => {
  return (
    <div className="w-72 flex-shrink-0 flex flex-col rounded-md bg-gray-100 dark:bg-gray-800/30">
      <div className="px-3 py-2 flex items-center justify-between">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">
          {column.name} ({column.tasks.length})
        </h3>
      </div>
      <div className="flex-1 px-2 pb-2 overflow-y-auto max-h-[calc(100vh-180px)]">
        {column.tasks.length > 0 ? (
          <div className="space-y-2">
            {column.tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task, column.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No tasks yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
