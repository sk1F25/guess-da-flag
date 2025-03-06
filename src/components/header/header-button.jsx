import { clsx } from "clsx";

export function HeaderButton(onClick, className) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "text-gray-300 hover:text-white blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded",
        className
      )}
    ></button>
  );
}
