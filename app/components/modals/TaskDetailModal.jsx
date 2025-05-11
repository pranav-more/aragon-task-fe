"use client";

import { useState } from "react";
import { useBoard } from "../../context/BoardContext";

const TaskDetailModal = ({
  isOpen,
  onClose,
  task,
  columnId,
  boardId,
  columns,
}) => {
  const { updateTask, deleteTask, moveTask } = useBoard();
  const [editedTask, setEditedTask] = useState({ ...task });
  const [selectedColumn, setSelectedColumn] = useState(columnId);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubtaskToggle = (index) => {
    const updatedSubtasks = [...editedTask.subtasks];
    updatedSubtasks[index].isCompleted = !updatedSubtasks[index].isCompleted;
    setEditedTask({ ...editedTask, subtasks: updatedSubtasks });

    // Save the changes immediately
    updateTask(boardId, selectedColumn, {
      ...editedTask,
      subtasks: updatedSubtasks,
    });
  };

  const handleStatusChange = (e) => {
    const newColumnId = e.target.value;

    if (newColumnId !== columnId) {
      // Only move if the column has changed
      moveTask(boardId, columnId, newColumnId, editedTask);
      setSelectedColumn(newColumnId);
    }

    onClose();
  };

  const handleDelete = () => {
    if (isDeleting) {
      deleteTask(boardId, columnId, task.id);
      onClose();
    } else {
      setIsDeleting(true);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white pr-8">
              {task.title}
            </h2>
            <button
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {task.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {task.description}
            </p>
          )}

          {task.subtasks && task.subtasks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                Subtasks ({task.subtasks.filter((s) => s.isCompleted).length} of{" "}
                {task.subtasks.length})
              </h3>
              <div className="space-y-2">
                {task.subtasks.map((subtask, index) => (
                  <div
                    key={subtask.id}
                    className="flex items-center p-2 rounded-md bg-gray-100 dark:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      id={`subtask-${subtask.id}`}
                      checked={subtask.isCompleted}
                      onChange={() => handleSubtaskToggle(index)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`subtask-${subtask.id}`}
                      className={`ml-2 text-sm ${
                        subtask.isCompleted
                          ? "line-through text-gray-400 dark:text-gray-500"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {subtask.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2"
            >
              Status
            </label>
            <select
              id="status"
              value={selectedColumn}
              onChange={handleStatusChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleDelete}
              className={`px-4 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                isDeleting
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              }`}
            >
              {isDeleting ? "Confirm Delete" : "Delete Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
