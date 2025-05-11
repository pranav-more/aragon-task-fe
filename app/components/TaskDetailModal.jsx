"use client";

import { useState } from "react";
import { useBoard } from "../context/BoardContext";
import Modal from "./Modal";
import Button from "./Button";

const TaskDetailModal = ({
  isOpen,
  onClose,
  task,
  columnId,
  boardId,
  columns,
}) => {
  const { updateTask, deleteTask } = useBoard();
  const [selectedStatus, setSelectedStatus] = useState(columnId);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleStatusSubmit = () => {
    if (selectedStatus !== columnId) {
      deleteTask(boardId, columnId, task.id);
      updateTask(boardId, selectedStatus, task);
      onClose();
    }
  };

  const handleSubtaskToggle = (subtaskId) => {
    setEditedTask({
      ...editedTask,
      subtasks: editedTask.subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, isCompleted: !subtask.isCompleted }
          : subtask
      ),
    });
  };

  const saveChanges = () => {
    updateTask(boardId, columnId, editedTask);
    setIsEditMode(false);
  };

  const handleDeleteTask = () => {
    deleteTask(boardId, columnId, task.id);
    onClose();
  };

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Task" : task.title}
    >
      {isEditMode ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={editedTask.description || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              rows={4}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="secondary" onClick={() => setIsEditMode(false)}>
              Cancel
            </Button>
            <Button onClick={saveChanges}>Save Changes</Button>
          </div>
        </div>
      ) : (
        <>
          {task.description && (
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {task.description}
            </p>
          )}

          {task.subtasks.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subtasks ({completedSubtasks} of {task.subtasks.length})
              </p>
              <div className="space-y-2">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md"
                  >
                    <input
                      type="checkbox"
                      checked={subtask.isCompleted}
                      onChange={() => handleSubtaskToggle(subtask.id)}
                      className="mr-3 h-4 w-4 text-indigo-500"
                    />
                    <span
                      className={`text-sm ${
                        subtask.isCompleted
                          ? "text-gray-500 dark:text-gray-400 line-through"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Current Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={handleStatusChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            <div>
              <Button
                variant="danger"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Delete
              </Button>
            </div>

            <div className="space-x-2">
              <Button variant="secondary" onClick={() => setIsEditMode(true)}>
                Edit
              </Button>
              <Button onClick={handleStatusSubmit}>Move Task</Button>
            </div>
          </div>

          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-bold text-red-600 mb-4">
                  Delete Task
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Are you sure you want to delete '{task.title}'? This action
                  cannot be undone.
                </p>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleDeleteTask}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default TaskDetailModal;
