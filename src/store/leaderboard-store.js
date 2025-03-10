import { create } from "zustand";
import { supabase } from "../api/supabase";
import { useAuthStore } from "./auth-store";

export const useLeaderboardStore = create((set, get) => ({
  entries: [],
  isLoading: false,
  averageComposite: null, // Кэш среднего значения
  lastUpdated: null,

  fetchingLeaderboard: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from("leaderboard")
        .select(
          `
                *,
                users (username)
            `
        )
        .order("composite_score", { ascending: false })
        .limit(10);
      if (error) throw error;

      const formattedData = data.map((entry, i) => ({
        place: i + 1,
        player: entry.users.username,
        score: `${entry.score}/${entry.total_questions}`,
        percent: Math.round((entry.score / entry.total_questions) * 100),
        time: formatTime(entry.time_seconds),
      }));
      set({ entries: formattedData });
    } catch (error) {
      console.error("loading table error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  saveScore: async (score, totalQuestions, timeSeconds) => {
    try {
      const user = useAuthStore.getState().user;
      if (!user) throw new Error("user not found");

      const { error } = await supabase.from("leaderboard").insert({
        user_id: user.id,
        score: score,
        total_questions: totalQuestions,
        time_seconds: timeSeconds,
      });

      if (error) throw error;
    } catch (error) {
      console.error("save score error:", error);
    }
  },

  fetchAllScores: async () => {
    try {
      const { data } = await supabase
        .from("leaderboard")
        .select("composite_score");

      return data.map((entry) => entry.composite_score);
    } catch (error) {
      console.error("Ошибка загрузки scores:", error);
      return [];
    }
  },
  updateAverage: async () => {
    const { lastUpdated } = get();
    if (lastUpdated && Date.now() - lastUpdated < 3600000) return;

    const scores = await get().fetchAllScores();
    const average =
      scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    set({
      averageComposite: average,
      lastUpdated: Date.now(),
    });
  },
}));

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}
