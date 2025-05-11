"use client";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  onClick,
  disabled = false,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "rounded font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50";

  const variantClasses = {
    primary:
      "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-400",
  };

  const sizeClasses = {
    sm: "text-xs py-1 px-2",
    md: "text-sm py-2 px-4",
    lg: "text-base py-3 px-6",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
