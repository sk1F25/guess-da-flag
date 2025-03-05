import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full py-4 px-72 bg-gray-900 shadow-md flex justify-between">
      <Link to="/" className="text-2xl font-bold text-white">
        GuessTheFlag
      </Link>
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            to="/game"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Play
          </Link>
          <Link
            to="/leaderboard"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Leaderboard
          </Link>
        </div>
      </nav>
    </header>
  );
}
