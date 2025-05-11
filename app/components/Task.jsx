"use client";

const Task = ({ task, onClick }) => {
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      tabIndex={0}
      aria-label={`Task: ${task.title}`}
      role="button"
    >
      <h4 className="font-bold text-gray-800 dark:text-white mb-2 truncate">
        {task.title}
      </h4>

      {totalSubtasks > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {completedSubtasks} of {totalSubtasks} subtasks completed
        </p>
      )}
    </div>
  );
};

export default Task;
