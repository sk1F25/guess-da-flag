import { useGameStore } from "../../store/store";
import { useLeaderboardStore } from "../../store/leaderboard-store";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function GameResult({ isGameStarted, isGameOver }) {
  const { correctAnswers, incorrectAnswers, score, resetGame, seconds } =
    useGameStore();
  const { saveScore } = useLeaderboardStore();
  const [percentile, setPercentile] = useState(0);

  const minutesStr = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsStr = String(seconds % 60).padStart(2, "0");
  const formattedTime = `${minutesStr}:${secondsStr}`;

  const navigate = useNavigate();

  useEffect(() => {
    if (isGameOver) {
      const calculateResults = async () => {
        const currentScore = score.correct;
        const currentTime = seconds;

        const allScores = await useLeaderboardStore.getState().fetchAllScores();

        const sortedScores = [
          ...allScores,
          { score: currentScore, time: currentTime },
        ].sort((a, b) => {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          return a.time - b.time;
        });

        const position = sortedScores.findIndex(
          (s) => s.score === currentScore && s.time === currentTime
        );

        setPercentile(() => {
          return Math.round(
            ((sortedScores.length - position) / sortedScores.length) * 100
          );
        });
        saveScore(score.correct, score.total, seconds);
      };

      calculateResults();
    }
  }, [isGameOver, score, seconds, saveScore]);

  return (
    <>
      {isGameOver && (
        <div className="flex justify-center flex-col items-center mb-10">
          <div className="mt-10">
            <div>
              Correct answers: {score.correct}/{score.total}
            </div>
            <div>Time: {formattedTime}</div>
            <div>Your result is better than {percentile}% players have!</div>
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
              right answers: {score.correct}/{score.total}
            </div>
          )}
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
