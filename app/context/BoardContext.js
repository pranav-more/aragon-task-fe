"use client";

import { createContext, useContext, useReducer, useState } from "react";
import { initialBoards } from "../data/mockData";

// Create context
const BoardContext = createContext();

// Action types
const ADD_BOARD = "ADD_BOARD";
const DELETE_BOARD = "DELETE_BOARD";
const UPDATE_BOARD = "UPDATE_BOARD";
const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";

// Reducer function
const boardReducer = (state, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return [...state, action.payload];

    case DELETE_BOARD:
      return state.filter((board) => board.id !== action.payload);

    case UPDATE_BOARD:
      return state.map((board) =>
        board.id === action.payload.id ? action.payload : board
      );

    case ADD_TASK: {
      const { boardId, columnId, task } = action.payload;
      return state.map((board) => {
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
      });
    }

    case UPDATE_TASK: {
      const { boardId, columnId, task } = action.payload;
      return state.map((board) => {
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
      });
    }

    case DELETE_TASK: {
      const { boardId, columnId, taskId } = action.payload;
      return state.map((board) => {
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
      });
    }

    default:
      return state;
  }
};

// Provider component
export const BoardProvider = ({ children }) => {
  const [boards, dispatch] = useReducer(boardReducer, initialBoards);
  const [activeBoardId, setActiveBoardId] = useState(
    initialBoards[0]?.id || ""
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeBoard =
    boards.find((board) => board.id === activeBoardId) || boards[0];

  // Actions
  const addBoard = (board) => {
    dispatch({ type: ADD_BOARD, payload: board });
  };

  const deleteBoard = (boardId) => {
    dispatch({ type: DELETE_BOARD, payload: boardId });
    // If the deleted board was active, set another board as active
    if (boardId === activeBoardId) {
      const newActiveBoard = boards.find((b) => b.id !== boardId);
      setActiveBoardId(newActiveBoard?.id || "");
    }
  };

  const updateBoard = (board) => {
    dispatch({ type: UPDATE_BOARD, payload: board });
  };

  const addTask = (boardId, columnId, task) => {
    dispatch({
      type: ADD_TASK,
      payload: { boardId, columnId, task },
    });
  };

  const updateTask = (boardId, columnId, task) => {
    dispatch({
      type: UPDATE_TASK,
      payload: { boardId, columnId, task },
    });
  };

  const deleteTask = (boardId, columnId, taskId) => {
    dispatch({
      type: DELETE_TASK,
      payload: { boardId, columnId, taskId },
    });
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
        setActiveBoardId,
        addBoard,
        deleteBoard,
        updateBoard,
        addTask,
        updateTask,
        deleteTask,
        toggleSidebar,
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
