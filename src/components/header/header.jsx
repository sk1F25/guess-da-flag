import { Link } from "react-router-dom";
import avatar from "./avatar.jpg";

export function Header() {
  return (
    <header className="w-full py-4 px-72 bg-gray-900 shadow-md flex justify-between">
      <Link to="/" className="text-2xl font-bold text-white flex items-center">
        GuessDaFlag
      </Link>
      <div className="flex items-center justify-between gap-10">
        <nav>
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
        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <span>Profile</span>
          <img src={avatar} className="w-8 h-8 rounded-full object-cover"></img>
        </button>
      </div>
    </header>
  );
}
