import { useGameStore } from "../../store/store";
import { clsx } from "clsx";

export function GameResult({ isGameStarted }) {
  const { correctAnswers, incorrectAnswers, score } = useGameStore();

  return (
    <>
      {isGameStarted ? (
        <div className="flex flex-col justify-center items-center gap-10">
          <div>
            right answers: {score.correct}/{score.total}
          </div>
          <h2>answers:</h2>
          <div className="grid grid-cols-2 w-full flex-col">
            <div className="w-full flex justify-start items-start flex-col">
              {correctAnswers.map((country) => {
                return (
                  <AnswerItem key={country} isCorrect={true}>
                    {country}
                  </AnswerItem>
                );
              })}
            </div>
            <div className="w-full flex justify-start items-end flex-col">
              {incorrectAnswers.map((country) => {
                return (
                  <AnswerItem key={country} isCorrect={false}>
                    {country}
                  </AnswerItem>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

function AnswerItem({ children, isCorrect }) {
  return (
    <div className={clsx("text-lg", isCorrect && "text-green-500")}>
      {children}
    </div>
  );
}
