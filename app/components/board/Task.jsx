"use client";

const Task = ({ task, onClick }) => {
  return (
    <div
      className="p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
      tabIndex="0"
      role="button"
      aria-label={`View details for task: ${task.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <h4 className="font-medium text-gray-800 dark:text-white mb-1 truncate">
        {task.title}
      </h4>
      {task.description && (
        <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
          {task.description}
        </p>
      )}
      {task.subtasks && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {task.subtasks.filter((s) => s.isCompleted).length} of{" "}
          {task.subtasks.length} subtasks
        </p>
      )}
    </div>
  );
};

export default Task;
