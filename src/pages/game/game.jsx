import clsx from "clsx";
import { useGame } from "../../hooks/useGame";

export function Game({ className }) {
  const {
    question,
    loading,
    selectedOption,
    isAnswered,
    answersCounter,
    handleAnswer,
  } = useGame();

  return (
    <div className={clsx(className, "max-w-lg mx-auto px-4 py-8")}>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8">guess dis flag</h1>
        <div>
          right answers: {answersCounter.rightAnswers}/
          {answersCounter.overallAnswers}
        </div>
      </div>
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        {loading ? (
          <div className="text-gray-500">loading flag...</div>
        ) : (
          <>
            <div className="mb-8 w-64 h-48 flex items-center justify-center rounded-lg p-4">
              <img
                src={question.countryUrl}
                alt="Флаг страны"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
              {question.options.map((option) => (
                <OptionButton
                  key={option}
                  option={option}
                  onClick={handleAnswer}
                  isSelected={selectedOption === option}
                  isCorrect={option === question.country}
                  isAnswered={isAnswered}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function OptionButton({ option, onClick, isSelected, isCorrect, isAnswered }) {
  return (
    <button
      onClick={() => onClick(option)}
      disabled={isAnswered}
      className={clsx(
        "px-6 py-3 rounded-lg transition-colors duration-200",
        "font-medium border-2 disabled:opacity-75",
        {
          "border-green-500": isAnswered && isCorrect,
          "border-red-500": isAnswered && isSelected && !isCorrect,
          "border-blue-500": isSelected && !isAnswered,
          "border-gray-300": !isSelected && !isAnswered,
        }
      )}
    >
      {option}
    </button>
  );
}
