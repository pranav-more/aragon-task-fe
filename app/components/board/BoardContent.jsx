"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useBoard } from "../../context/BoardContext";
import Task from "./Task";
import TaskDetailModal from "../modals/TaskDetailModal";
import EmptyState from "./EmptyState";

const BoardContent = () => {
  const { activeBoard, updateBoard } = useBoard();
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);

  // This is needed because react-beautiful-dnd has issues with SSR
  useEffect(() => {
    setIsBrowser(true);
  }, []);

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

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or if the task was dropped in the same position
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceColumn = activeBoard.columns.find(
      (col) => col.id === source.droppableId
    );
    const destinationColumn = activeBoard.columns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destinationColumn) return;

    const taskToMove = sourceColumn.tasks.find(
      (task) => task.id === draggableId
    );
    if (!taskToMove) return;

    // Move the task
    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const newTasks = Array.from(sourceColumn.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, taskToMove);

      const updatedColumns = activeBoard.columns.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, tasks: newTasks };
        }
        return col;
      });

      updateBoard({
        ...activeBoard,
        columns: updatedColumns,
      });
    } else {
      // Moving to a different column
      const sourceTasks = Array.from(sourceColumn.tasks);
      sourceTasks.splice(source.index, 1);

      const destinationTasks = Array.from(destinationColumn.tasks);
      destinationTasks.splice(destination.index, 0, taskToMove);

      const updatedColumns = activeBoard.columns.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, tasks: sourceTasks };
        }
        if (col.id === destinationColumn.id) {
          return { ...col, tasks: destinationTasks };
        }
        return col;
      });

      updateBoard({
        ...activeBoard,
        columns: updatedColumns,
      });
    }
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
          {isBrowser ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="flex p-6 space-x-6 min-w-max">
                {activeBoard.columns.map((column) => (
                  <div
                    key={column.id}
                    className="w-72 flex-shrink-0 flex flex-col bg-gray-100 dark:bg-gray-800/30 rounded-md"
                  >
                    <div className="px-3 py-2 flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 bg-${
                          column.name.toLowerCase().includes("done")
                            ? "green"
                            : column.name.toLowerCase().includes("doing")
                            ? "amber"
                            : column.name.toLowerCase().includes("todo")
                            ? "blue"
                            : "purple"
                        }-500`}
                      />
                      <h3 className="font-medium text-gray-700 dark:text-gray-300">
                        {column.name} ({column.tasks.length})
                      </h3>
                    </div>
                    <Droppable droppableId={column.id}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="flex-1 px-2 pb-2 mt-2 min-h-[100px] overflow-y-auto"
                        >
                          {column.tasks.length > 0 ? (
                            <div className="space-y-2">
                              {column.tasks.map((task, index) => (
                                <Task
                                  key={task.id}
                                  task={task}
                                  index={index}
                                  onClick={() =>
                                    handleTaskClick(task, column.id)
                                  }
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                No tasks yet
                              </p>
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
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
            </DragDropContext>
          ) : (
            <div className="flex p-6 space-x-6 min-w-max">
              {activeBoard.columns.map((column) => (
                <div key={column.id} className="w-72 flex-shrink-0">
                  <div className="px-3 py-2 flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 bg-${
                        column.name.toLowerCase().includes("done")
                          ? "green"
                          : column.name.toLowerCase().includes("doing")
                          ? "amber"
                          : column.name.toLowerCase().includes("todo")
                          ? "blue"
                          : "purple"
                      }-500`}
                    />
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">
                      {column.name} ({column.tasks.length})
                    </h3>
                  </div>
                  <div className="flex-1 px-2 pb-2 mt-2">
                    {column.tasks.length > 0 ? (
                      <div className="space-y-2">
                        {column.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleTaskClick(task, column.id)}
                          >
                            <h4 className="font-medium text-gray-800 dark:text-white mb-1 truncate">
                              {task.title}
                            </h4>
                            {task.subtasks && (
                              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                {
                                  task.subtasks.filter((s) => s.isCompleted)
                                    .length
                                }{" "}
                                of {task.subtasks.length} subtasks
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No tasks yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>
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
          )}
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
