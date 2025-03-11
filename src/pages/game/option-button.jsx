import { useKeyPress } from "@siberiacancode/reactuse";
import clsx from "clsx";

export function OptionButton({
  option,
  onClick,
  index,
  isSelected,
  isCorrect,
  isAnswered,
  isGameOver,
  options,
}) {
  const firstLetter = option.charAt(0).toUpperCase();

  const hasDuplicateFirstLetter =
    options.filter((opt) => opt.charAt(0).toUpperCase() === firstLetter)
      .length > 1;

  const letter = hasDuplicateFirstLetter
    ? String.fromCharCode(65 + index)
    : firstLetter;

  useKeyPress(letter.toLowerCase(), (pressed) => {
    if (pressed && !isAnswered && !isGameOver) {
      onClick(option);
    }
  });

  return (
    <button
      onClick={() => onClick(option)}
      disabled={isAnswered || isGameOver}
      className={clsx(
        "px-6 py-3 rounded-lg transition-colors duration-200 flex justify-start gap-4",
        "font-medium border-2 disabled:opacity-75",
        {
          "border-green-500": isAnswered && isCorrect,
          "border-red-500": isAnswered && isSelected && !isCorrect,
        }
      )}
    >
      <strong className="text-slate-600">{letter}</strong>
      {option}
    </button>
  );
}
