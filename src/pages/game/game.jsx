import clsx from "clsx";
import { useState, useEffect } from "react";
import { LoadSpinner } from "../../components/ui/load-spinner";
import { useGameStore } from "../../store/store";
import { GameResult } from "./game-result";
import { formatTime } from "../../utils/format-time";
import { OptionButton } from "./option-button";

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
    <div className={clsx(className, "max-w-lg mx-auto px-4 py-8 ")}>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8">
          Угадай эти {totalQuestions} флагов
        </h1>
        <div>Время: {formattedTime}</div>
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
                {currentQuestion.options.map((option, index) => (
                  <OptionButton
                    key={option}
                    option={option}
                    options={currentQuestion.options}
                    index={index}
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
            Начать игру
          </button>
        )}
      </div>

      <GameResult isGameStarted={gameStarted} isGameOver={isGameOver} />
    </div>
  );
}
