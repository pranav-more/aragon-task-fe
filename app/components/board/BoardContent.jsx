"use client";

import { useState } from "react";
import { useBoard } from "../../context/BoardContext";
import Column from "./Column";
import TaskDetailModal from "../modals/TaskDetailModal";
import EmptyState from "./EmptyState";

const BoardContent = () => {
  const { activeBoard, updateBoard } = useBoard();
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const handleTaskClick = (task, columnId) => {
    setSelectedTask(task);
    setSelectedColumn(columnId);
  };

  const closeTaskDetail = () => {
    setSelectedTask(null);
    setSelectedColumn(null);
  };

  const handleAddColumnClick = () => {
    setNewColumnName("");
    setIsAddColumnModalOpen(true);
  };

  const closeAddColumnModal = () => {
    setIsAddColumnModalOpen(false);
  };

  const handleAddColumn = (e) => {
    e.preventDefault();
    if (!newColumnName.trim()) return;

    const newColumn = {
      id: `column-${Date.now()}`,
      name: newColumnName.trim(),
      tasks: [],
    };

    const updatedBoard = {
      ...activeBoard,
      columns: [...activeBoard.columns, newColumn],
    };

    updateBoard(updatedBoard);
    closeAddColumnModal();
  };

  const handleAddTask = () => {
    // This will be implemented when we create the Add Task functionality
    console.log("Add task clicked");
  };

  if (!activeBoard) {
    return (
      <EmptyState
        message="No board selected"
        description="Select a board from the sidebar or create a new one to get started"
      />
    );
  }

  if (activeBoard.columns.length === 0) {
    return (
      <EmptyState
        message="This board is empty"
        description="Edit this board to add columns and start adding tasks"
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Board Content */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div
          className="h-full overflow-x-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex p-6 space-x-6 min-w-max">
            {activeBoard.columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                onTaskClick={handleTaskClick}
              />
            ))}

            {/* Add New Column Button */}
            <div className="w-72 flex-shrink-0 rounded-md bg-gray-100 dark:bg-gray-800/30 border-2 border-dashed border-gray-300 dark:border-gray-700">
              <button
                onClick={handleAddColumnClick}
                className="w-full h-full min-h-[80px] flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                aria-label="Add a new column"
                tabIndex="0"
              >
                <span className="flex items-center font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add a new column
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedTask && selectedColumn && (
        <TaskDetailModal
          isOpen={!!selectedTask}
          onClose={closeTaskDetail}
          task={selectedTask}
          columnId={selectedColumn}
          boardId={activeBoard.id}
          columns={activeBoard.columns}
        />
      )}

      {isAddColumnModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Add New Column
            </h2>
            <form onSubmit={handleAddColumn}>
              <div className="mb-4">
                <label
                  htmlFor="columnName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Column Name
                </label>
                <input
                  type="text"
                  id="columnName"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter column name"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={closeAddColumnModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Add Column
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardContent;
