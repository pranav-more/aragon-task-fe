"use client";

import { useState } from "react";
import { useBoard } from "../../context/BoardContext";

const CreateBoardModal = ({ isOpen, onClose }) => {
  const { addBoard } = useBoard();
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([
    { id: "column-1", name: "Todo" },
    { id: "column-2", name: "In Progress" },
    { id: "column-3", name: "Done" },
  ]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!boardName.trim()) {
      setError("Board name is required");
      return;
    }

    if (columns.length === 0) {
      setError("You need at least one column");
      return;
    }

    if (columns.some((col) => !col.name.trim())) {
      setError("Column names cannot be empty");
      return;
    }

    const newBoard = {
      id: `board-${Date.now()}`,
      name: boardName.trim(),
      columns: columns.map((col) => ({
        ...col,
        tasks: [],
      })),
    };

    addBoard(newBoard);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setBoardName("");
    setColumns([
      { id: "column-1", name: "Todo" },
      { id: "column-2", name: "In Progress" },
      { id: "column-3", name: "Done" },
    ]);
    setError("");
  };

  const handleAddColumn = () => {
    setColumns([...columns, { id: `column-${Date.now()}`, name: "" }]);
  };

  const handleRemoveColumn = (id) => {
    setColumns(columns.filter((col) => col.id !== id));
  };

  const handleColumnNameChange = (id, value) => {
    setColumns(
      columns.map((col) => (col.id === id ? { ...col, name: value } : col))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Create New Board
        </h2>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="boardName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Board Name
            </label>
            <input
              type="text"
              id="boardName"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g. Web Design Project"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Board Columns
            </label>

            <div className="space-y-2">
              {columns.map((column) => (
                <div key={column.id} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Column name"
                    value={column.name}
                    onChange={(e) =>
                      handleColumnNameChange(column.id, e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveColumn(column.id)}
                    className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                    aria-label="Remove column"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddColumn}
              className="mt-3 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              + Add New Column
            </button>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
