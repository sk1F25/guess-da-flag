import { create } from "zustand";
import { supabase } from "../api/supabase";

const AUTH_TIMEOUT = 1000 * 60 * 60;

const getStorageItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Ошибка при сохранении ${key}:`, error);
  }
};

export const useAuthStore = create((set, get) => {
  const checkAuthValidity = async (currentUserId) => {
    const now = Date.now();
    const lastCheck = getStorageItem("lastAuthCheck") || 0;
    const cachedUser = getStorageItem("cachedUser");

    if (now - lastCheck < AUTH_TIMEOUT && cachedUser) {
      return cachedUser;
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", currentUserId)
      .single();

    if (!error && data) {
      setStorageItem("lastAuthCheck", now);
      setStorageItem("cachedUser", data);
      return data;
    }

    localStorage.removeItem("userId");
    localStorage.removeItem("lastAuthCheck");
    localStorage.removeItem("cachedUser");
    return null;
  };

  return {
    user: null,
    isLoading: true,

    initAuth: async () => {
      try {
        const userId = getStorageItem("userId");
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

        setStorageItem("userId", data.id);
        setStorageItem("lastAuthCheck", Date.now());
        setStorageItem("cachedUser", data);
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
        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("username", username)
          .single();

        if (existingUser) {
          return {
            success: false,
            error: "Пользователь с таким именем уже существует",
          };
        }

        const { data, error } = await supabase
          .from("users")
          .insert({ username, password })
          .select()
          .single();

        if (error) throw error;
        if (!data) throw new Error("Не удалось создать пользователя");

        setStorageItem("userId", data.id);
        setStorageItem("lastAuthCheck", Date.now());
        setStorageItem("cachedUser", data);
        set({ user: data });
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error.message,
        };
      }
    },

    signOut: () => {
      localStorage.removeItem("userId");
      localStorage.removeItem("lastAuthCheck");
      localStorage.removeItem("cachedUser");
      set({ user: null });
    },

    updateUser: async (userData) => {
      try {
        const { user } = get();
        if (!user) throw new Error("Пользователь не авторизован");

        const { data, error } = await supabase
          .from("users")
          .update(userData)
          .eq("id", user.id)
          .select()
          .single();

        if (error) throw error;
        if (!data) throw new Error("Не удалось обновить данные");

        setStorageItem("cachedUser", data);
        set({ user: data });
        return { success: true };
      } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        return {
          success: false,
          error: error.message,
        };
      }
    },

    updateUserAvatar: async (avatarCode) => {
      return get().updateUser({ avatar: avatarCode });
    },
  };
});
