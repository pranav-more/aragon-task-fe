"use client";

import { useState } from "react";
import { useBoard } from "../../context/BoardContext";
import CreateBoardModal from "../modals/CreateBoardModal";

const Sidebar = () => {
  const {
    boards,
    activeBoardId,
    setActiveBoardId,
    isSidebarOpen,
    toggleSidebar,
    theme,
    toggleTheme,
  } = useBoard();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleBoardClick = (boardId) => {
    setActiveBoardId(boardId);
  };

  const handleCreateBoard = () => {
    setIsCreateModalOpen(true);
  };

  if (!isSidebarOpen) {
    return (
      <div className="fixed left-0 bottom-8 flex flex-col gap-2">
        <button
          onClick={toggleTheme}
          className="bg-indigo-500 text-white p-3 rounded-r-md hover:bg-indigo-600 transition-colors"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </button>
        <button
          onClick={toggleSidebar}
          className="bg-indigo-500 text-white p-3 rounded-r-md hover:bg-indigo-600 transition-colors"
          aria-label="Open sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <>
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 h-screen flex flex-col border-r border-gray-200 dark:border-gray-800 sticky top-0">
        <div className="p-5">
          <div className="flex items-center">
            <span className="text-indigo-500 font-bold text-2xl">kanban</span>
          </div>
        </div>

        <div className="mt-6 px-4">
          <h2 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-3 px-2">
            All Boards ({boards.length})
          </h2>

          <ul className="space-y-1">
            {boards.map((board) => (
              <li key={board.id}>
                <button
                  className={`
                    w-full text-left px-4 py-2 rounded-md flex items-center
                    transition-colors focus:outline-none
                    ${
                      board.id === activeBoardId
                        ? "bg-indigo-500 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                    }
                  `}
                  onClick={() => handleBoardClick(board.id)}
                  aria-current={board.id === activeBoardId ? "page" : undefined}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    />
                  </svg>
                  <span className="truncate font-medium">{board.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <button
            className="w-full mt-3 text-indigo-500 font-medium px-4 py-2 rounded-md flex items-center hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors"
            onClick={handleCreateBoard}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Create New Board</span>
          </button>
        </div>

        <div className="mt-auto">
          <div className="mx-4 my-4 p-3 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="toggle"
                id="theme-toggle"
                checked={theme === "dark"}
                onChange={toggleTheme}
                className="opacity-0 w-0 h-0 absolute"
              />
              <label
                htmlFor="theme-toggle"
                className="block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer"
              >
                <span
                  className={`block h-6 w-6 rounded-full transform transition-transform duration-200 ease-in bg-white ${
                    theme === "dark" ? "translate-x-4" : "translate-x-0"
                  }`}
                ></span>
              </label>
            </div>
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </span>
          </div>

          <button
            className="flex items-center px-4 py-2 mx-4 mb-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            onClick={toggleSidebar}
            aria-label="Hide sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <span>Hide Sidebar</span>
          </button>
        </div>
      </aside>

      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
