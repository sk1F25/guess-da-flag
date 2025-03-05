import { useState, useEffect } from "react";
import { supabase } from "../api/supabase";

export function useGame() {
  const [flags, setFlags] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState({
    country: "",
    countryUrl: "",
    options: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answersCounter, setAnswerCounter] = useState({
    rightAnswers: 0,
    overallAnswers: 0,
  });

  const loadQuestion = (flags, index) => {
    const randomCountry = flags[index];
    setQuestion({
      country: randomCountry.country,
      countryUrl: randomCountry.flag_url,
      options: randomCountry.options.sort(() => Math.random() - 0.5),
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchFlags = async () => {
      try {
        const { data, error } = await supabase.from("flags").select("*");
        if (!isMounted) return;

        if (error) throw error;

        setFlags(data);
        loadQuestion(data, 0);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFlags();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAnswer = (selected) => {
    setSelectedOption(selected);
    setIsAnswered(true);

    setAnswerCounter((lastAnswerCounter) => {
      const newCounter = {
        ...lastAnswerCounter,
        rightAnswers:
          selected === question.country
            ? lastAnswerCounter.rightAnswers + 1
            : lastAnswerCounter.rightAnswers,
        overallAnswers: lastAnswerCounter.overallAnswers + 1,
      };

      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex >= flags.length) {
        setTimeout(() => {
          alert(
            `Игра завершена! Правильных ответов: ${newCounter.rightAnswers} из ${newCounter.overallAnswers}`
          );
        }, 1000);
      }

      return newCounter;
    });

    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < flags.length) {
        setCurrentQuestionIndex(nextIndex);
        loadQuestion(flags, nextIndex);
      }

      setSelectedOption(null);
      setIsAnswered(false);
    }, 1000);
  };

  return {
    question,
    loading,
    selectedOption,
    isAnswered,
    answersCounter,
    handleAnswer,
  };
}
