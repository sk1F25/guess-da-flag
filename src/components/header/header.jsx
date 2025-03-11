import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";
import { ProfileMenu } from "./profile-menu";
export function Header() {
  const { user } = useAuthStore();

  return (
    <header className="w-full py-4 bg-gray-900 shadow-md">
      <div className="px-4 flex flex-row justify-between items-center md:justify-center md:gap-50">
        <Link
          to="/"
          className="text-2xl font-bold text-white flex items-center"
        >
          GuessDaFlag
        </Link>

        {user ? (
          <>
            <div className="md:hidden">
              <ProfileMenu />
            </div>
            <div className="hidden md:flex">
              <ProfileMenu />
            </div>
          </>
        ) : (
          <button
            className="bg-blue-500 rounded hover:bg-blue-700 font-bold 
    py-2 px-4 w-[90px] h-[44px] flex items-center justify-center"
          >
            <Link to="/auth" className="text-gray-300 hover:text-white">
              Войти
            </Link>
          </button>
        )}
      </div>
    </header>
  );
}
