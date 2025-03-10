import { create } from "zustand";
import { supabase } from "../api/supabase";
import { useAuthStore } from "./auth-store";

export const useLeaderboardStore = create((set) => ({
  entries: [],
  isLoading: false,
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
        .order("score", { ascending: false })
        .order("time_seconds", { ascending: true })
        .limit(10);
      if (error) throw error;

      const formattedData = data.map((entry, i) => ({
        place: i + 1,
        player: entry.users.username,
        score: `${entry.score}/${entry.total_questions}`,
        percent: Math.round((entry.score / entry.total_questions) * 100),
        time: formatTime(entry.time_seconds),
        rawScore: entry.score,
        rawTime: entry.time_seconds,
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
        .select("score, time_seconds");

      return data.map((entry) => ({
        score: entry.score,
        time: entry.time_seconds,
      }));
    } catch (error) {
      console.error("Ошибка загрузки scores:", error);
      return [];
    }
  },
}));

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}
