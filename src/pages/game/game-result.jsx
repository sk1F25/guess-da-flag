import { useGameStore } from "../../store/store";
import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { useGameResult } from "../../hooks/useGameResult";

export function GameResult({ isGameStarted, isGameOver }) {
  const { correctAnswers, incorrectAnswers, score, resetGame } = useGameStore();
  const { percentile, formattedTime } = useGameResult(isGameOver);

  const navigate = useNavigate();

  return (
    <>
      {isGameOver && (
        <div className="flex justify-center flex-col items-center mb-10">
          <div className="mt-10">
            <div>
              Правильных ответов: {score.correct}/{score.total}
            </div>
            <div>Время: {formattedTime}</div>
            {percentile === 0 ? (
              <div>Loading data...</div>
            ) : (
              <div>Твой результат лучше чем у {percentile}% игроков!</div>
            )}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={() => resetGame()}
          >
            Restart Game
          </button>
          <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
        </div>
      )}
      {isGameStarted ? (
        <div className="flex flex-col justify-center items-center gap-10">
          {!isGameOver && (
            <div>
              Правильных ответов: {score.correct}/{score.total}
            </div>
          )}
          <h2>Ответы:</h2>
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
