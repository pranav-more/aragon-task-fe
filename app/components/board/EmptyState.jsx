"use client";

const EmptyState = ({ message, description }) => (
  <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
        {message}
      </h2>
      <p className="text-gray-500 mb-6">{description}</p>
    </div>
  </div>
);

export default EmptyState;
