import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/header";
import { Home } from "./pages/home/home";
import { Game } from "./pages/game/game";
import { Leaderboard } from "./pages/leaderboard/leaderboard";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full flex justify-center flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game className="mx-auto" />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
