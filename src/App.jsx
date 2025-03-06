import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/header";
import { Home } from "./pages/home/home";
import { Game } from "./pages/game/game";
import { Leaderboard } from "./pages/leaderboard/leaderboard";
import { AuthForm } from "./components/auth/auth-form";
import { ProtectedRoute } from "./components/auth/protected-route";
import { useAuthStore } from "./store/auth-store";

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <BrowserRouter>
      <div className="w-full flex justify-center flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Game className="mx-auto" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
