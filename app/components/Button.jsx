"use client";

const Button = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}) => {
  let buttonClass = "px-4 py-2 rounded-md font-medium transition-colors ";

  if (variant === "primary") {
    buttonClass +=
      "bg-indigo-500 hover:bg-indigo-600 text-white disabled:bg-indigo-300";
  } else if (variant === "secondary") {
    buttonClass +=
      "bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200";
  } else if (variant === "danger") {
    buttonClass += "bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300";
  }

  if (className) {
    buttonClass += " " + className;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
};

export default Button;
