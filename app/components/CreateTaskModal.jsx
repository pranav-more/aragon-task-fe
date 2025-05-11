"use client";

import { useState } from "react";
import { useBoard } from "../context/BoardContext";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";
import Button from "./Button";
import FormInput from "./FormInput";

const CreateTaskModal = ({ isOpen, onClose, columns }) => {
  const { activeBoard, addTask } = useBoard();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(columns[0]?.id || "");
  const [subtasks, setSubtasks] = useState([
    { id: uuidv4(), title: "", isCompleted: false },
    { id: uuidv4(), title: "", isCompleted: false },
  ]);
  const [errors, setErrors] = useState({});

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { id: uuidv4(), title: "", isCompleted: false }]);
  };

  const handleSubtaskChange = (id, value) => {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, title: value } : subtask
      )
    );
  };

  const handleDeleteSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    const emptySubtasks = subtasks.filter((subtask) => !subtask.title.trim());
    if (emptySubtasks.length > 0) {
      newErrors.subtasks = "All subtasks must have a title";
    }

    if (!status) {
      newErrors.status = "Please select a status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTask = {
      id: uuidv4(),
      title,
      description,
      subtasks: subtasks.filter((subtask) => subtask.title.trim()),
    };

    addTask(activeBoard.id, status, newTask);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus(columns[0]?.id || "");
    setSubtasks([
      { id: uuidv4(), title: "", isCompleted: false },
      { id: uuidv4(), title: "", isCompleted: false },
    ]);
    setErrors({});
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Task"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Task</Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          id="task-title"
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="e.g. Take coffee break"
          error={errors.title}
          required
        />

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            rows={4}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subtasks
          </label>

          {subtasks.map((subtask, index) => (
            <div key={subtask.id} className="flex items-center mb-2">
              <FormInput
                id={`subtask-${index}`}
                value={subtask.title}
                onChange={(value) => handleSubtaskChange(subtask.id, value)}
                placeholder="e.g. Drink coffee & smile"
                className="flex-1"
                error={index === 0 && errors.subtasks ? errors.subtasks : ""}
              />
              <button
                type="button"
                onClick={() => handleDeleteSubtask(subtask.id)}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label={`Delete subtask ${index + 1}`}
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
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddSubtask}
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-md font-medium mt-2"
          >
            + Add New Subtask
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.status
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            {columns.map((column) => (
              <option key={column.id} value={column.id}>
                {column.name}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status}</p>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
