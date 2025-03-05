import { useEffect, useState } from "react";
import { supabase } from "../../api/supabase";
import clsx from "clsx";

export function Game({ className }) {
  const [question, setQuestion] = useState({
    country: "",
    countryUrl: "",
    options: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchFlags = async () => {
      try {
        const { data, error } = await supabase.from("flags").select("*");
        if (!isMounted) return;

        if (error) throw error;

        const randomCountry = data[Math.floor(Math.random() * data.length)];
        setQuestion({
          country: randomCountry.country,
          countryUrl: randomCountry.flag_url,
          options: randomCountry.options.sort(() => Math.random() - 0.5),
        });
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
  };

  return (
    <div className={clsx(className, "max-w-lg mx-auto px-4 py-8")}>
      <h1 className="text-3xl font-bold text-center mb-8">guess dis flag</h1>

      <div className="min-h-[400px] flex flex-col items-center justify-center">
        {loading ? (
          <div className="text-gray-500">loading flag...</div>
        ) : (
          <>
            <div className="mb-8 w-64 h-48 flex items-center justify-center rounded-lg p-4">
              <img
                src={question.countryUrl}
                alt="Флаг страны"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
              {question.options.map((option) => (
                <OptionButton
                  key={option}
                  option={option}
                  onClick={handleAnswer}
                  isSelected={selectedOption === option}
                  isCorrect={option === question.country}
                  isAnswered={isAnswered}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function OptionButton({ option, onClick, isSelected, isCorrect, isAnswered }) {
  return (
    <button
      onClick={() => onClick(option)}
      disabled={isAnswered}
      className={clsx(
        "px-6 py-3 rounded-lg transition-colors duration-200",
        "font-medium border-2 disabled:opacity-75",
        {
          "border-green-500": isAnswered && isCorrect,
          "border-red-500": isAnswered && isSelected && !isCorrect,
          "border-blue-500": isSelected && !isAnswered,
          "border-gray-300": !isSelected && !isAnswered,
        }
      )}
    >
      {option}
    </button>
  );
}
