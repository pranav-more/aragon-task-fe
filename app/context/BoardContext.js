"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { initialBoards } from "../data/mockData";

// Create context
const BoardContext = createContext();

// Provider component
export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(initialBoards);
  const [activeBoardId, setActiveBoardId] = useState(
    initialBoards[0]?.id || ""
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("dark"); // Default to dark theme

  const activeBoard =
    boards.find((board) => board.id === activeBoardId) || boards[0];

  // Initialize theme from local storage when component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Actions
  const addBoard = (board) => {
    setBoards((prevBoards) => [...prevBoards, board]);
  };

  const deleteBoard = (boardId) => {
    setBoards((prevBoards) =>
      prevBoards.filter((board) => board.id !== boardId)
    );
    // If the deleted board was active, set another board as active
    if (boardId === activeBoardId) {
      const newActiveBoard = boards.find((b) => b.id !== boardId);
      setActiveBoardId(newActiveBoard?.id || "");
    }
  };

  const updateBoard = (board) => {
    setBoards((prevBoards) =>
      prevBoards.map((b) => (b.id === board.id ? board : b))
    );
  };

  const addTask = (boardId, columnId, task) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) => {
        if (board.id !== boardId) return board;

        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.id !== columnId) return column;

            return {
              ...column,
              tasks: [...column.tasks, task],
            };
          }),
        };
      })
    );
  };

  const updateTask = (boardId, columnId, task) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) => {
        if (board.id !== boardId) return board;

        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.id !== columnId) return column;

            return {
              ...column,
              tasks: column.tasks.map((t) => (t.id === task.id ? task : t)),
            };
          }),
        };
      })
    );
  };

  const moveTask = (boardId, fromColumnId, toColumnId, task) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) => {
        if (board.id !== boardId) return board;

        // Create a new array of columns
        return {
          ...board,
          columns: board.columns.map((column) => {
            // Remove task from source column
            if (column.id === fromColumnId) {
              return {
                ...column,
                tasks: column.tasks.filter((t) => t.id !== task.id),
              };
            }

            if (column.id === toColumnId) {
              return {
                ...column,
                tasks: [...column.tasks, task],
              };
            }

            return column;
          }),
        };
      })
    );
  };

  const deleteTask = (boardId, columnId, taskId) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) => {
        if (board.id !== boardId) return board;

        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.id !== columnId) return column;

            return {
              ...column,
              tasks: column.tasks.filter((t) => t.id !== taskId),
            };
          }),
        };
      })
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        activeBoard,
        activeBoardId,
        isSidebarOpen,
        theme,
        setActiveBoardId,
        addBoard,
        deleteBoard,
        updateBoard,
        addTask,
        updateTask,
        moveTask,
        deleteTask,
        toggleSidebar,
        toggleTheme,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

// Custom hook
export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};
