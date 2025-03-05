export function Header() {
  return (
    <header className="w-full py-4 px-72 bg-gray-900 shadow-md flex justify-between">
      <div className="text-2xl font-bold text-white">GuessTheFlag</div>
      <nav className=" flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Play
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Leaderboard
          </a>
        </div>
      </nav>
    </header>
  );
}
