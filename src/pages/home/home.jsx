import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <h1 className="text-4xl font-bold mb-8">GuessTheFlag</h1>
      <button
        onClick={() => navigate("/game")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Играть
      </button>
    </div>
  );
}
