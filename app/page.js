"use client";

import { useEffect } from "react";
import { useBoard } from "./context/BoardContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BoardContent from "./components/BoardContent";

export default function Home() {
  const { isSidebarOpen } = useBoard();

  // Enable keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Add keyboard navigation if needed
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Sidebar />

      <div
        className={`flex-1 flex flex-col overflow-auto${
          isSidebarOpen ? "" : ""
        }`}
      >
        <Header />
        <BoardContent />
      </div>
    </main>
  );
}
