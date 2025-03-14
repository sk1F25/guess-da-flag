import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      <div>
        <div className="text-center">
          <h1
            className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text 
          bg-gradient-to-r from-blue-400 to-purple-400 p-2"
          >
            GuessDaFlag
          </h1>
          <p className="text-slate-300 mb-10">
            Проверь свои знания флагов мира
          </p>

          <div className="space-y-4 mb-8 flex flex-col items-center">
            <button
              onClick={() => navigate("/game")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg 
              w-80 transition-all duration-300 transform  shadow-lg"
            >
              Играть
            </button>

            <button
              onClick={() => navigate("/leaderboard")}
              className="bg-transparent text-white font-bold py-3 px-6 rounded-lg w-80 border-2
               border-blue-500 hover:bg-blue-500/20 transition-all duration-300 transform "
            >
              Таблица лидеров
            </button>
          </div>

          <p className="text-slate-300 mt-6 text-sm">
            Соревнуйся с другими игроками и узнай, кто лучше всех знает флаги
            мира.
          </p>
          <div className="mt-10 mx-auto text-slate-400 text-xs">
            <p>© 2025 GuessDaFlag. Все права защищены.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
