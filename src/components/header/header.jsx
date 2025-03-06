import { Link } from "react-router-dom";
import avatar from "./avatar.jpg";
import { useState } from "react";
import { MenuButton } from "../ui/menu-button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 bg-gray-900 shadow-md">
      <div className="px-4 flex flex-col md:flex-row md:justify-center md:gap-50">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-white flex items-center"
          >
            GuessDaFlag
          </Link>
          <MenuButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
          />
        </div>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 mt-4 md:mt-0`}
        >
          <nav>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
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
            <img
              src={avatar}
              className="w-8 h-8 rounded-full object-cover"
              alt="Profile"
            ></img>
          </button>
        </div>
      </div>
    </header>
  );
}
