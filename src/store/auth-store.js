import { create } from "zustand";
import { supabase } from "../api/supabase";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  signIn: async (username, password) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Неверное имя пользователя или пароль");

      set({ user: data });
      return { success: true };
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return {
        success: false,
        error: "Неверное имя пользователя или пароль",
      };
    }
  },

  signUp: async (username, password) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .insert([{ username, password }])
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          // код ошибки unique constraint
          throw new Error("Это имя пользователя уже занято");
        }
        throw error;
      }

      set({ user: data });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Ошибка при регистрации",
      };
    }
  },

  signOut: () => {
    set({ user: null });
  },

  initAuth: async () => {
    set({ isLoading: false });
  },
}));
