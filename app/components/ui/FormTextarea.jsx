"use client";

const FormTextarea = ({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  rows = 4,
  className = "",
  ...props
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          w-full px-3 py-2 border rounded-md resize-none
          focus:outline-none focus:ring-2 focus:ring-indigo-500 
          disabled:bg-gray-100 disabled:cursor-not-allowed
          transition duration-150 ease-in-out
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600"
          }
          ${disabled ? "opacity-75" : ""}
          dark:bg-gray-700 dark:text-white
        `}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormTextarea;
