import clsx from "clsx";
import { useState, useEffect } from "react";
import { LoadSpinner } from "../../components/ui/load-spinner";
import { useGameStore } from "../../store/store";
import { GameResult } from "./game-result";
import { formatTime } from "../../utils/format-time";

export function Game({ className }) {
  const {
    currentQuestion,
    isLoading,
    selectedOption,
    isAnswered,
    submitAnswer,
    isGameOver,
    resetGame,
    seconds,
    setSeconds,
    totalQuestions,
  } = useGameStore();

  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    return () => {
      resetGame(); // ресетит игру при анмаунте компонента
    };
  }, [resetGame]);

  const formattedTime = formatTime(seconds);

  const handleGameStart = () => {
    resetGame();
    setGameStarted(true);
  };

  useEffect(() => {
    if (gameStarted && !isGameOver) {
      const interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameStarted, seconds, setSeconds, isGameOver]);

  return (
    <div className={clsx(className, "max-w-lg mx-auto px-4 py-8")}>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8">
          guess dis {totalQuestions} flags
        </h1>
        <div>Time: {formattedTime}</div>
      </div>
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        {gameStarted ? (
          isLoading ? (
            <LoadSpinner />
          ) : (
            <>
              <div className="mb-8 w-64 h-48 flex items-center justify-center rounded-lg p-4">
                <img
                  src={currentQuestion.countryUrl}
                  alt="Флаг страны"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                {currentQuestion.options.map((option) => (
                  <OptionButton
                    key={option}
                    option={option}
                    onClick={submitAnswer}
                    isSelected={selectedOption === option}
                    isCorrect={option === currentQuestion.country}
                    isAnswered={isAnswered}
                    isGameOver={isGameOver}
                  />
                ))}
              </div>
            </>
          )
        ) : (
          <button
            onClick={handleGameStart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            start game
          </button>
        )}
      </div>

      <GameResult isGameStarted={gameStarted} isGameOver={isGameOver} />
    </div>
  );
}

function OptionButton({
  option,
  onClick,
  isSelected,
  isCorrect,
  isAnswered,
  isGameOver,
}) {
  return (
    <button
      onClick={() => onClick(option)}
      disabled={isAnswered || isGameOver}
      className={clsx(
        "px-6 py-3 rounded-lg transition-colors duration-200",
        "font-medium border-2 disabled:opacity-75",
        {
          "border-green-500": isAnswered && isCorrect,
          "border-red-500": isAnswered && isSelected && !isCorrect,
        }
      )}
    >
      {option}
    </button>
  );
}
