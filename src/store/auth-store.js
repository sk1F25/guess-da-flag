import { create } from "zustand";
import { supabase } from "../api/supabase";

const AUTH_TIMEOUT = 1000 * 60 * 60; // 1 час
let lastAuthCheck = 0;
let cachedUser = null;

const checkAuthValidity = async (userId) => {
  const now = Date.now();

  // Если кеш актуален и есть пользователь, возвращаем его
  if (now - lastAuthCheck < AUTH_TIMEOUT && cachedUser) {
    return cachedUser;
  }

  // Иначе делаем новый запрос
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (!error && data) {
    lastAuthCheck = now;
    cachedUser = data;
    return data;
  }

  // Если произошла ошибка или пользователь не найден
  localStorage.removeItem("userId");
  lastAuthCheck = 0;
  cachedUser = null;
  return null;
};

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

      localStorage.setItem("userId", data.id);
      lastAuthCheck = Date.now();
      cachedUser = data;
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
          throw new Error("Это имя пользователя уже занято");
        }
        throw error;
      }

      localStorage.setItem("userId", data.id);
      lastAuthCheck = Date.now();
      cachedUser = data;
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
    localStorage.removeItem("userId");
    lastAuthCheck = 0;
    cachedUser = null;
    set({ user: null });
  },

  initAuth: async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const userData = await checkAuthValidity(userId);
        if (userData) {
          set({ user: userData });
        }
      }
    } catch (error) {
      console.error("Ошибка при инициализации:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
