"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import { useBoard } from "../../context/BoardContext";

const CreateBoardModal = ({ isOpen, onClose }) => {
  const { addBoard } = useBoard();
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([
    { id: uuidv4(), name: "Todo" },
    { id: uuidv4(), name: "Doing" },
  ]);
  const [errors, setErrors] = useState({});

  const handleAddColumn = () => {
    setColumns([...columns, { id: uuidv4(), name: "" }]);
  };

  const handleColumnChange = (id, value) => {
    setColumns(
      columns.map((column) =>
        column.id === id ? { ...column, name: value } : column
      )
    );
  };

  const handleDeleteColumn = (id) => {
    setColumns(columns.filter((column) => column.id !== id));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!boardName.trim()) {
      newErrors.boardName = "Board name is required";
    }

    const emptyColumns = columns.filter((column) => !column.name.trim());
    if (emptyColumns.length > 0) {
      newErrors.columns = "All columns must have a name";
    }

    const duplicateNames = columns.some(
      (column, index) =>
        columns.findIndex((c) => c.name === column.name) !== index
    );
    if (duplicateNames) {
      newErrors.columns = "Column names must be unique";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newBoard = {
      id: uuidv4(),
      name: boardName,
      columns: columns.map((column) => ({
        ...column,
        tasks: [],
      })),
    };

    addBoard(newBoard);
    onClose();
  };

  const handleReset = () => {
    setBoardName("");
    setColumns([
      { id: uuidv4(), name: "Todo" },
      { id: uuidv4(), name: "Doing" },
    ]);
    setErrors({});
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Board"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Board</Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          id="board-name"
          label="Board Name"
          value={boardName}
          onChange={setBoardName}
          placeholder="e.g. Web Design Project"
          error={errors.boardName}
          required
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Board Columns
          </label>

          {columns.map((column, index) => (
            <div key={column.id} className="flex items-center mb-2">
              <FormInput
                id={`column-${index}`}
                value={column.name}
                onChange={(value) => handleColumnChange(column.id, value)}
                placeholder="e.g. Todo"
                className="flex-1"
                error={index === 0 && errors.columns ? errors.columns : ""}
              />
              {columns.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleDeleteColumn(column.id)}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label={`Delete column ${column.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddColumn}
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-md font-medium mt-2"
          >
            + Add New Column
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateBoardModal;
