import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../../store/auth-store";

import { ArrowDown } from "../ui/icons/arrow-down";
import { Link } from "react-router-dom";

const defaultAvatar = "../../../public/avatar.jpg";

export function ProfileMenu() {
  const { user, signOut } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const avatarSrc = (user) =>
    user.avatar === "default"
      ? defaultAvatar
      : `https://flagcdn.com/${user.avatar}.svg`;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="hidden md:flex items-center gap-4 h-[44px] focus:outline-none"
        onClick={toggleMenu}
      >
        <img
          src={avatarSrc(user)}
          alt="аватар пользователя"
          className="w-10 h-10"
        />
        <div className="flex items-center gap-1">
          <span>{user?.username || "Гость"}</span>
          <ArrowDown />
        </div>
      </button>

      <button className="md:hidden text-white" onClick={toggleMenu}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
          <div className="md:hidden flex items-center gap-2 px-4 py-3 border-b border-gray-700">
            <img
              src={avatarSrc}
              alt="аватар пользователя"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">{user?.username || "Гость"}</span>
          </div>
          <nav>
            <div className="flex flex-col items-start px-4 py-2 gap-2">
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Профиль
              </Link>
              <Link
                to="/game"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Играть
              </Link>
              <Link
                to="/leaderboard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Таблица лидеров
              </Link>
            </div>
          </nav>
          <button
            onClick={signOut}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}
