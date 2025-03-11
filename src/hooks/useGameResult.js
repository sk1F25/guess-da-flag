import { useState, useEffect } from "react";
import { useGameStore } from "../store/store";
import { useLeaderboardStore } from "../store/leaderboard-store";
import { formatTime } from "../utils/format-time";

export function useGameResult(isGameOver) {
  const { score, seconds } = useGameStore();
  const { saveScore } = useLeaderboardStore();
  const [percentile, setPercentile] = useState(0);

  const formattedTime = formatTime(seconds);

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

        setPercentile(
          Math.round(
            ((sortedScores.length - position) / sortedScores.length) * 100
          )
        );
        saveScore(score.correct, score.total, seconds);
      };

      calculateResults();
    }
  }, [isGameOver, score, seconds, saveScore]);

  return { percentile, formattedTime };
}
