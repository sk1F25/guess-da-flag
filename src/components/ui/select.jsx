import { useState } from "react";
import { ArrowDown } from "./icons/arrow-down";
export function Select({
  options = [],
  value,
  onChange,
  placeholder = "Выберите...",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (option) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className="w-full px-4 py-2 text-left border rounded-md flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel}
        <ArrowDown />
      </button>

      {isOpen && (
        <div className="absolute w-full mt-1 border rounded-md bg-slate-800 shadow-lg z-10">
          <ul className="max-h-60 overflow-auto bg-slate-800">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-gray-600"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
