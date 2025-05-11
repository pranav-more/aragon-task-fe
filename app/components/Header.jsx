"use client";

import { useState } from "react";
import { useBoard } from "../context/BoardContext";
import Button from "./Button";
import EditBoardModal from "./EditBoardModal";
import DeleteBoardModal from "./DeleteBoardModal";
import CreateTaskModal from "./CreateTaskModal";

const Header = () => {
  const { activeBoard } = useBoard();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddTask = () => {
    setIsTaskModalOpen(true);
  };

  const handleEditBoard = () => {
    setIsMenuOpen(false);
    setIsEditBoardModalOpen(true);
  };

  const handleDeleteBoard = () => {
    setIsMenuOpen(false);
    setIsDeleteBoardModalOpen(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        {activeBoard?.name || "No board selected"}
      </h1>

      <div className="flex items-center">
        <Button
          onClick={handleAddTask}
          disabled={!activeBoard || activeBoard.columns.length === 0}
          className="mr-2"
        >
          + Add New Task
        </Button>

        <div className="relative">
          <button
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleMenu}
            aria-label="Board options"
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 z-10 border border-gray-200 dark:border-gray-700">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleEditBoard}
                  role="menuitem"
                  disabled={!activeBoard}
                >
                  Edit Board
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleDeleteBoard}
                  role="menuitem"
                  disabled={!activeBoard}
                >
                  Delete Board
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeBoard && (
        <>
          <CreateTaskModal
            isOpen={isTaskModalOpen}
            onClose={() => setIsTaskModalOpen(false)}
            columns={activeBoard.columns}
          />

          <EditBoardModal
            isOpen={isEditBoardModalOpen}
            onClose={() => setIsEditBoardModalOpen(false)}
            board={activeBoard}
          />

          <DeleteBoardModal
            isOpen={isDeleteBoardModalOpen}
            onClose={() => setIsDeleteBoardModalOpen(false)}
            boardId={activeBoard.id}
            boardName={activeBoard.name}
          />
        </>
      )}
    </header>
  );
};

export default Header;
