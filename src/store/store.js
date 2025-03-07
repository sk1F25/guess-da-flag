import { create } from "zustand";
import { supabase } from "../api/supabase";

const ANSWER_DELAY = 1000;
const TOTAL_QUESTIONS = 20;

const initialGameState = {
  flags: [],
  currentQuestion: {
    country: "",
    countryUrl: "",
    options: [],
  },
  currentIndex: 0,
  isLoading: true,
  selectedOption: null,
  score: {
    correct: 0,
    total: 0,
  },
  isGameOver: false,
  isAnswered: false,
  seconds: 0,
  totalQuestions: TOTAL_QUESTIONS,
  correctAnswers: [],
  incorrectAnswers: [],
};

export const useGameStore = create((set, get) => ({
  ...initialGameState,

  setSeconds: (value) => {
    set({ seconds: value });
  },

  // Действия
  initializeGame: async () => {
    try {
      const { data, error } = await supabase.from("flags").select("*");
      if (error) throw error;

      const shuffledFlags = shuffleArray(data).slice(0, TOTAL_QUESTIONS);

      set({
        flags: shuffledFlags,
        isLoading: false,
        currentQuestion: createQuestion(shuffledFlags[0]),
      });
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      set({ isLoading: false });
    }
  },

  submitAnswer: (selected) => {
    const { currentQuestion, currentIndex, flags } = get();
    const isCorrect = selected === currentQuestion.country;

    set((state) => ({
      selectedOption: selected,
      isAnswered: true,
      score: {
        correct: isCorrect ? state.score.correct + 1 : state.score.correct,
        total: state.score.total + 1,
      },
      correctAnswers: isCorrect
        ? [...state.correctAnswers, currentQuestion.country]
        : state.correctAnswers,
      incorrectAnswers: !isCorrect
        ? [...state.incorrectAnswers, currentQuestion.country]
        : state.incorrectAnswers,
    }));

    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      const isLastQuestion = nextIndex >= flags.length;

      if (isLastQuestion) {
        set({ isGameOver: true });
        return;
      }

      set({
        currentIndex: nextIndex,
        currentQuestion: createQuestion(flags[nextIndex]),
        selectedOption: null,
        isAnswered: false,
      });
    }, ANSWER_DELAY);
  },

  resetGame: () => {
    set({ ...initialGameState });
    get().initializeGame();
  },
}));

// Вспомогательная функция для создания вопроса
function createQuestion(flagData) {
  return {
    country: flagData.country,
    countryUrl: flagData.flag_url,
    options: shuffleArray(flagData.options),
  };
}

// Вспомогательная функция для перемешивания массива
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
